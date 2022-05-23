import { Router } from "express";
import ArmyCountry from "../../../db/models/ArmyCountry";
import Game from '../../../db/models/Game';
import Player from "../../../db/models/Player";
import HttpException from "../../../exceptions/HttpExceptions";

const router = Router();

router.post('',async (req,res,next) => {
    const { addedArmies, gameId } = req.body;
    
    if (!addedArmies) return next(new HttpException(400,'There is not a body'));
    const game = await Game.findByPk(gameId,{
        attributes: ['id','nextPlayerId','statusId','maxPlayers'],
        include: [{ 
            model: Player, as: 'players' 
        },{
            model: Player, as: 'nextPlayer'
        },{
            model: ArmyCountry,
            attributes: ['playerId'] 
        }] 
    });
    if (!game) return next(new HttpException(400,'There is no game with this id.'))
    /*
        First find and locally update quantities, so if is
        an error here, a response is sended before fully updating 
        in order to have consistency
    */
    let receivedArmiesQty = 0;
    const toUpdateInstances: ArmyCountry[] = []
    for (let id in addedArmies) {
        if (addedArmies[id]){
            receivedArmiesQty += addedArmies[id];
            try {
                const country = await ArmyCountry.findByPk(id)
                if (!country) return next(new HttpException(400,'Maybe there is a bad id'))
                country.armiesQty += addedArmies[id]
                toUpdateInstances.push(country)
            } catch (err) { return next(new HttpException(400,'There was an error updating quantities')) }
        }
    }
    
    /* Checks if the qty armies is right */
    const statusId: number = game.statusId;
    const playerCountries: number = Math.floor(game.armiesCountries.filter(c => c.playerId === game.nextPlayerId).length / 2);
    if (
        // (statusId === 3 && receivedArmiesQty !== 5) Mechanic change, pairing with TEG Junior rules
           (statusId === 3 && receivedArmiesQty !== 6)
        || (statusId === 4 && receivedArmiesQty !== 3)
        || (statusId === 4 && receivedArmiesQty !== 4)
        // Checks countries qty / 2 
        // || (statusId === 5 && receivedArmiesQty !== playerCountries) Mechanic change, pairing with TEG Junior rules
    ) return next(new HttpException(400,'You are sending a wrong armies qty')) 
    
    /* 
        Finally saves update,
        checks current and nextPlayer
        and changes nextPlayer and status if round is complete
    */
    try {
        toUpdateInstances.forEach(async (country) => await country.save());
    } catch (err) { return next(new HttpException(400,'There was an error updating quantities')) };
    
    if (statusId === 5) {
        // if status is 5 only changes status to 6 and
        // not perform player change
        game.statusId = 6;
    } else {
        const orderNextPlayer = game.nextPlayer.order === game.maxPlayers ? 1 : game.nextPlayer.order + 1;
        if (orderNextPlayer === 1) {
            if (statusId === 4) game.statusId = 6; // After last preparation round it must pass to status 6, which is for attack
            // if (statusId === 3) game.statusId = 4; // Mechanic change, pairing with TEG Junior rules
            if (statusId === 3) game.statusId = 6;    // Mechanic change, pairing with TEG Junior rules
        }
        const nextPlayer = game.players.find((player) => player.order === orderNextPlayer);
        await game.$set('nextPlayer',nextPlayer!)
    }

    await game.save();
    res.json({ gameId });
})

export default router