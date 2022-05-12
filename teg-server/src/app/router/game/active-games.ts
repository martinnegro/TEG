import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
// import Game from "../../../db/models/Game";
// import User from "../../../db/models/User";
// import Status from "../../../db/models/Status";
// import Player from "../../../db/models/Player";
import Models from '../../../db'
const router = Router();

router.get('/:id', async (req, res, next) => {
    const { id } = req.params

    if ( !id || id === undefined) return next(new HttpException(400, 'id is missing.'))
    
    const { Game, User, Status, Player } = Models

    try {
        const games = await Game.findAll({     
            where: {
                '$players.user_id$': id
            },
            include: [
                {
                    model: Player,
                    as: 'players'
                },{
                    model: Player,
                    as: 'nextPlayer',
                    include: [{
                        model: User,
                        attributes: ['id','name','alias']
                    }]
                },{
                    model: User,
                    as: 'creator',
                    attributes: ['id','alias','name']
                },{
                    model: Status,
                    attributes: ['id', 'title', 'description']
                }
            ]
        });
        
        if (games) res.json(games);
        else res.json([]);

    } catch (err) { next(err) }
});

export default router;