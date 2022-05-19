import { Router } from "express";
import Player from "../../../db/models/Player";
import ArmyCountry from "../../../db/models/ArmyCountry";
import Game from "../../../db/models/Game";
import isUuid from "../../../utils/isUuid";
import objIsEmpty from "../../../utils/objIsEmpty";
import HttpException from '../../exceptions/HttpExceptions';

const router = Router();

router.post('',async (req,res,next) => {
    const { regroupedArmies, gameId } = req.body;

    if (!isUuid(gameId)) return next(new HttpException(400,'Is not a valid gameId'));
    const include = [{ model: Player, as: 'players' },{ model: Player, as: 'nextPlayer' }];
    const game = await Game.findByPk(gameId, { include } );
    if (!game) return  next(new HttpException(400,'No game with that id.'));

    if (!regroupedArmies) return next(new HttpException(400,'No regroupedArmies'));

    if (!objIsEmpty(regroupedArmies)) {
        // If request has changes
        // Brings ArmiesCountry
        // Updates armiesQty just adding the value of each key.
        // Saves.
        let armiesIds: string[] = [];
        for (let key in regroupedArmies) {
           armiesIds = [...armiesIds,key] 
        }
        const armiesCountries = await ArmyCountry.findAll({ where: { id: armiesIds } })

        for (let i = 0; i < armiesCountries.length; i++) {
            armiesCountries[i].armiesQty += regroupedArmies[armiesCountries[i].id];
            await armiesCountries[i].save();
        }
    }
    // Make status, players and everything that needs to make game roll  
    // status, next player, round
    const orderNextPlayer = game.nextPlayer.order === game.maxPlayers ? 1 : game.nextPlayer.order + 1;
    const nextPlayerId = game.players.find((player) => player.order === orderNextPlayer)?.id;
    if (typeof nextPlayerId === 'string') {
        game.nextPlayerId = nextPlayerId;
    } 
    if (!game.round) {
        game.round = 1;
        game.statusId = 6;
    } else {
        game.round++
        game.statusId = 5;
    }
    await game.save();
    return { gameId }
});

export default router;

