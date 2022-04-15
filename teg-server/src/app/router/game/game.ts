import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
import Models from '../../../db'

const router = Router();

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    if (!id || id === 'undefined') return next(new HttpException(400, 'Id is missing.'));

    const { Game } = Models;

    try {
        const reqGame = await Game.findOne({ where: { id }})
        res.json(reqGame);
    } catch(err) {
        next(err)
    }

});

export default router;