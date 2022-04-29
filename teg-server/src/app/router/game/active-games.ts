import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
import Models from '../../../db'

const router = Router();

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const { User, Game, Status, Player } = Models;

    if ( !id || id === undefined) return next(new HttpException(400, 'id is missing.'))
    
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
                    as: 'nextPlayer'
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