import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
import Models from '../../../db';
import { Op } from "sequelize";
const router = Router();

router.get('/:id', async (req, res, next) => {
    const { id } = req.params

    if ( !id || id === undefined) return next(new HttpException(400, 'id is missing.'))
    
    const { Game, User, Status, Player } = Models

    try {
        const games = await Game.findAll({     
            where: {
                '$players.user_id$': id,
                statusId: { [Op.not]: 8 }
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