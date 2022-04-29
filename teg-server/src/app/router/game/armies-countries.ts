import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";

import ArmyCountry from "../../../db/models/ArmyCountry";
import Country from "../../../db/models/Country";
import Player from "../../../db/models/Player";
import Color from "../../../db/models/Color";

const router = Router();

router.get('',async (req,res,next)=>{
    const { game_id } = req.query;

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