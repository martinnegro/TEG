import { Router } from "express";
import { Op, Sequelize } from 'sequelize'
import HttpException from "../../../exceptions/HttpExceptions";

import Models from "../../../db/models";

const router = Router();

router.get('',async (req,res,next)=>{
    const { game_id } = req.query;
    const { Army_Country, Country, User_Game, Color } = Models;

    if (game_id === 'undefined' || !game_id || typeof game_id !== 'string') return next(new HttpException(400,'No game Id'))
    const armies_countries = await Army_Country.findAll({ 
        where: { id_game: game_id},
        attributes: ['id','id_game','id_user_game','id_country','armys_qty'],
        include: [
            {
                model: Country
            },{
                model: User_Game,
                include: [ Color ]
            }
        ]
    });
    res.json(armies_countries)
});

export default router;