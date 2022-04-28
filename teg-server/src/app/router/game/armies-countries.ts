import { Router } from "express";
import { Op, Sequelize } from 'sequelize'
import HttpException from "../../../exceptions/HttpExceptions";

import Models from "../../../db/models";

const router = Router();

router.get('',async (req,res,next)=>{
    const { game_id } = req.query;
    const { ArmyCountry, Country, Player, Color } = Models;

    if (game_id === 'undefined' || !game_id || typeof game_id !== 'string') return next(new HttpException(400,'No game Id'))

    try {
        const armies_countries = await ArmyCountry.findAll({ 
            where: { gameId: game_id},
            attributes: ['id','gameId','playerId','countryId','armiesQty'],
            include: [
                {
                    model: Country
                },{
                    model: Player,
                    include: [ Color ]
                }
            ]
        });
        res.json(armies_countries)
    } catch (err: any) { next(new HttpException(err.status || 500, err.message || 'Error')) }
});

export default router;