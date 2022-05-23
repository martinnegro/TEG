import battle from '../../../controllers/battle';
import { Router } from "express";
import ArmyCountry from '../../../db/models/ArmyCountry';
import HttpException from '../../../exceptions/HttpExceptions';
import User from '../../../db/models/User';
import Player from '../../../db/models/Player';
import Game from '../../../db/models/Game';
// import type ArmyCountry from 'db/models/ArmyCountry'

const router = Router();

router.post('', async (req,res,next) => {
    const { body } = req;
    let user: User | null, attacker: ArmyCountry | null, deffender: ArmyCountry | null,game: Game | null;
    try {
        user = await User.findByPk(body.userId);
        attacker = await ArmyCountry.findByPk(body.attacker,{ include: [ Player, { model: Game, attributes:['id'] }]});
        deffender = await ArmyCountry.findByPk(body.deffender,{ include: Player });
        game = await Game.findByPk(attacker?.game.id,{ include: ArmyCountry })
    } catch(err) { return  next(new HttpException(400,'There was a problem searching in DB.')); }
    
    if (!user) return next(new HttpException(400,'El usuario que ataca no existe.'));
    if (!game) return next(new HttpException(400,'La partida no existe.'));
    if (!attacker || !deffender ) return next (new HttpException(400,'Uno de los países no existe!'))
    if (attacker.armiesQty < 2 || deffender.armiesQty < 1 ) return next (new HttpException(400,'Uno de los países tiene una cantidad incorrecta de ejércitos'));
    if (attacker.player.userId !== body.userId) return next (new HttpException(400,'El país no te pertenece!'))

    const result: BattleResult | null = battle(attacker.armiesQty,deffender.armiesQty);
    
    /*
        If deffender ends with no armies the country 
        becomes the attacker's with 1 army and attacker country ends with finalArmies minus 1 (obligatory have at least one army)
        Else only assigns the finalArmies
    */
    console.log(result)  
    if (!result) return next (new HttpException(500,'Hubo un error'))
    if (result.deffender.finalArmys === 0) {
        await deffender.$set('player',attacker.player);
        deffender.armiesQty = 1;
        attacker.armiesQty = result.attacker.finalArmys - 1;
        game.canRegroup = true;
        /*
            Because player won a country, must check if 
            accomplished the goal.
        */
        let goalCountriesQty: number = 32;
        if (game.maxPlayers === 2) goalCountriesQty = 20;
        if (game.maxPlayers === 3) goalCountriesQty = 14;
        if (game.maxPlayers  >  3) goalCountriesQty = 12;
        
        const totalCountriesAttacker = game.armiesCountries.filter(c => c.playerId === attacker?.player.id).length + 1;
        console.log({ goalCountriesQty, totalCountriesAttacker });
        console.log('totalCountriesAttacker >  goalCountriesQty: ' +  `${totalCountriesAttacker >  goalCountriesQty}`)
        if ( totalCountriesAttacker ===  goalCountriesQty) {
            game.statusId = 8;
        }
    } else if (result.deffender.finalArmys > 0) {
        deffender.armiesQty = result.deffender.finalArmys;
        attacker.armiesQty = result.attacker.finalArmys;
    }
        
    await game.save();
    await deffender.save();
    await attacker.save();

    res.json({ result, gameId: attacker.game.id })

});

export default router