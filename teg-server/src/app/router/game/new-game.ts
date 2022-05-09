import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
import Game from '../../../db/models/Game'
import User from '../../../db/models/User'

const router = Router();



router.post('', async (req, res, next) => {
    const { userId, alias, colorId, maxPlayers } = req.body;
    
    if (!userId || userId === undefined 
        || !alias || alias === undefined
        || !colorId || colorId === undefined
    ) return next(new HttpException(400, 'Some information is missing. See doc')) 
    

    try {
        console.log({ userId })
        const user = await User.findByPk(userId,);
        if (!user) return next(new HttpException(400, 'No user.'));

        const newGame = await Game.build({
            alias,
            statusId: 1,
            maxPlayers: maxPlayers ? parseInt(maxPlayers) : 6,
            creatorUser: userId
        }).save()
        
        await newGame.$add('user',user,{ through: { colorId: colorId } })
    
        res.json(newGame)
        
    } catch(err) {
        next(err)
    }

});

export default router;