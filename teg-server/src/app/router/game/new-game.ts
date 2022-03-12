import { Router } from "express";
import { randomUUID } from "crypto";
import HttpException from "../../../exceptions/HttpExceptions";
import Models from "../../../db/models";

const router = Router();

router.post('', async (req, res, next) => {
    const { id_user, alias, id_color, max_players } = req.body;
    
    if (!id_user || id_user === undefined 
        || !alias || alias === undefined
        || !id_color || id_color === undefined
    ) return next(new HttpException(400, 'Alias or id are missing.')) 
    

    try {

        const { Game, User } = Models;

        const newGame = await Game.build({
            alias,
            id_status: 1,
            max_players: max_players ? parseInt(max_players) : 6,
            creator_user: id_user
        }).save()
        
        const user = await User.findByPk(id_user);
        
        if (!user) return next(new HttpException(400, 'No user.'));

        await newGame.$add('user',user,{ through: { id_color } })
        
        res.json(newGame)
    } catch(err) {
        next(err)
    }

});

export default router;