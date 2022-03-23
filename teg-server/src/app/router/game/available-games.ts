import { Router } from "express";
import { Op, Sequelize } from 'sequelize'
import HttpException from "../../../exceptions/HttpExceptions";

import Models from "../../../db/models";

const router = Router();

router.get('/:id_user', async (req, res, next) => {

    const { id_user } = req.params

    if (!id_user || id_user === undefined) return next(new HttpException(400, 'id_user is missing.'));

    try {
        const { Game, User_Game, User } = Models;
        const availableGames = await Game.findAll({ 
            where: Sequelize.literal(`"Game"."id" NOT IN (SELECT g.id FROM games AS g, user_game AS ug WHERE g.id = ug.id_game AND ug.id_user = '${id_user}') AND "Game"."id_status"=1`),
            include: [{
                model: User,
                as: 'creator',
                attributes: ['id', 'name', 'alias']
            },{
                model: User_Game,
                attributes: ['id']
            }],
        });

        res.json(availableGames)
    } catch(err) { console.log(err); next(err) }

});

export default router;