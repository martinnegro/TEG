import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
import Models from '../../../db/models'
import { User_Game } from "../../../db/models/User_Game";

const router = Router();

router.post('', async (req,res,next) => {
    const { id_user, id_game, id_color } = req.body;

    if (
        !id_user || id_user === undefined
        || !id_game || id_user === undefined
    ) {
        const error = new HttpException(400,'User or game id are missing.');
        return next(error);
    }

    const { Game, User, User_Game } = Models;

    try {
        const game = await Game.findByPk(id_game, {
            include: User_Game
        });
        if (!game) return next(new HttpException(410,'There is not a game with this id.'));
        
        const user = await User.findByPk(id_user);
        if (!user) return next(new HttpException(410,'There is no user with this id.'));
        
        await game.$add('user',user,{ through: { id_color } })

        if ( game.user_game.length + 1 === game.max_players ) {
            game.status = 2;
            await game.save()
        }

        res.status(204).json({ id_game })
    } catch(err) { next(err) }

});

export default router;