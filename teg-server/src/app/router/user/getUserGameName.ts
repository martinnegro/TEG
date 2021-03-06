import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
import Player from "../../../db/models/Player";
import User from "../../../db/models/User";

const router = Router();

router.get('', async (req,res,next) => {
    const { id } = req.query;

    if (!id) return next(new HttpException(400,'No id.'))

    try {
        const next_player = await Player.findByPk(id.toString(),{
            attributes: [],
            include: {
                model: User,
                attributes: ['name','alias']
            }
        });
        res.json(next_player)
    } catch (err) { next(err) }
});

export default router;