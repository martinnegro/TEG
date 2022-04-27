import { Router } from "express";
import { Op, Sequelize } from 'sequelize'
import HttpException from "../../../exceptions/HttpExceptions";

import Models from "../../../db/models";

const router = Router();

router.get('/:id_user', async (req, res, next) => {

    const { id_user } = req.params

    if (!id_user || id_user === undefined) return next(new HttpException(400, 'id_user is missing.'));

    try {
        const { Game, Player, User } = Models;
        const availableGames = await Game.findAll({ 
            where: Sequelize.literal(`"Game"."id" NOT IN (SELECT g.id FROM games AS g, players AS p WHERE g.id = p.game_id AND p.user_id = '${id_user}') AND "Game"."status_id"=1`),
            include: [{
                model: User,
                as: 'creator',
                attributes: ['id', 'name', 'alias']
            },{
                model: Player,
                attributes: ['id']
            }],
        });

        res.json(availableGames)
    } catch(err) { console.log(err); next(err) }

});

export default router;