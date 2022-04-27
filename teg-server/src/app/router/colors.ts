import { Router } from "express";
import HttpException from "../../exceptions/HttpExceptions";
import { Player } from "../../db/models/Player";
import { Color } from "../../db/models/Color";
import { Op } from "sequelize";


const router = Router();

router.get('/colors', async (req, res, next) => {
    try {
        const availableColors = await Color.findAll();
        res.json(availableColors);
    } catch (err) { next(err) }
});

router.get('/colors/:id_game', async (req,res,next) => {
    const { id_game } = req.params;

    try {
        const usedColors = await Color.findAll({
            include: {
                model: Player,
                where: { id_game },
                attributes: []
            }
        });


        const availableColors = await Color.findAll({
            where: {
                id: { [Op.notIn]:  usedColors.map( (color: Color) => color.id) }
            }
        })

        res.json(availableColors)
    } catch (err) { next(err) }

});

export default router;