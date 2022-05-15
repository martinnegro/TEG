import { Router } from "express";
import ArmyCountry from "../../../db/models/ArmyCountry";
import Game from "../../../db/models/Game";
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
    const statusId = game.getDataValue('statusId')
    if (
           (statusId === 3 && receivedArmiesQty !== 5)
        || (statusId === 4 && receivedArmiesQty !== 3)
    ) return next(new HttpException(400,'You are sending a wrong armies qty')) 
    
    /* 
        Finally saves update,
        checks current and nextPlayer
        and changes nextPlayer and status if round is complete
    */
    try {
        toUpdateInstances.forEach(async (country) => await country.save());
        const orderNextPlayer = game.nextPlayer.order === game.maxPlayers ? 1 : game.nextPlayer.order + 1;
        if (orderNextPlayer === 1) {
            if (statusId === 4) game.update({ statusId: 6 }); // After last preparation round it must pass to status 6, which is for attack
            if (statusId === 3) game.update({ statusId: 4 });
        }
        const nextPlayer = game.players.find((player) => player.order === orderNextPlayer)
        await game?.$set('nextPlayer',nextPlayer!);
    } catch (err: any) { return next(new HttpException(err.status,err.message)) }

    res.json({ gameId })

})

export default router