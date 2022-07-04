import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
import Models from '../../../db'

const router = Router();

router.get('/:gameId', async (req, res, next) => {
    const { gameId } = req.params;
    
    if (!gameId || gameId === 'undefined') return next(new HttpException(400, 'Id is missing.'));
    const { Game, Player, User, Color, Status, Country, ArmyCountry } = Models;

    try {
        const game = await Game.findByPk(gameId,{
            include: [
                {
                    model: Player,
                    as: 'players',
                    include: [ User, Color ]
                },{
                    model: Player,
                    as: 'nextPlayer',
                    include: [ User, Color ]
                },{
                    model: Status
                },{
                    model: ArmyCountry,
                    include: [ { 
                        model: Player,
                        include: [ { model: Color } ]
                    }, {
                        model: Country,
                        include: [{ model: Country }]
                    }]
                }
            ]
        })
        res.json(game);
    } catch(err) {
        next(err)
    }

});

export default router;