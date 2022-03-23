import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
import Models from '../../../db/index'
import { randomUUID } from "crypto";
import { User_Game } from "../../../db/models/User_Game";
import { Op } from "sequelize";

const router = Router();

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const { User, Game, Status } = Models;

    if ( !id || id === undefined) return next(new HttpException(400, 'id is missing.'))
    
    try {
        const games = await Game.findAll({     
            where: {
                '$users_game.id_user$': id
            },
            include: [
                {
                    model: User_Game
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

    } catch (err) { console.log(err); next(err) }
});

export default router;