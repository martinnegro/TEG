import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
import Models from '../../../db/models'
import distributePlayers from "../../../controllers/distributeOrderAndCountries";

const router = Router();

router.post('', async (req,res,next) => {
    const { id_user, id_game, id_color } = req.body;

    if (
        !id_user || id_user === undefined
        || !id_game || id_user === undefined
    ) return next(new HttpException(400,'User or game id are missing.'));

    const { Game, User, Player } = Models;

    try {
        // Se usa Game y Player para chequear máximo de jugadores
        const game = await Game.findByPk(id_game, {
            include: Player
        });
        if (!game) return next(new HttpException(410,'There is not a game with this id.'));
        
        const user = await User.findByPk(id_user);
        if (!user) return next(new HttpException(410,'There is no user with this id.'));
        
        await game.$add('user',user,{ through: { colorId: id_color } })
        res.status(204).json({ id_game })

        if ( game.players.length + 1 === game.maxPlayers ) {
            await distributePlayers(game)
        }

    } catch(err) { console.log(err); next(err) }

});

export default router;