import { Router } from "express";
import HttpException from "../../exceptions/HttpExceptions";
import Player from "../../db/models/Player";
import Color from "../../db/models/Color";
import { Op } from "sequelize";


const router = Router();

router.get('/colors', async (req, res, next) => {
    try {
        const availableColors = await Color.findAll();
        res.json(availableColors);
    } catch (err: any) { next(new HttpException(err.status || 500,err.message || 'Error')) }
});

router.get('/colors/:id_game', async (req,res,next) => {
    const { id_game: gameId } = req.params;

    try {
        const usedColors = await Color.findAll({
            include: {
                model: Player,
                where: { gameId },
                attributes: []
            }
        });


        const availableColors = await Color.findAll({
            where: {
                id: { [Op.notIn]:  usedColors.map( (color: Color) => color.id) }
            }
        })

        res.json(availableColors)
    } catch (err: any) { next(new HttpException(err.status || 500,err.message || 'Error')) }

});

export default router;