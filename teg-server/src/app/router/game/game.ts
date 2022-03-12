import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";
import Models from '../../../db'

const router = Router();

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    if (!id || id === undefined) {
        const message = 'Id is missing.'
        const status = 400;
        const err = new HttpException(status, message);
        return next(err)
    }

    const { Game } = Models;

    try {
        const reqGame = await Game.findOne({ where: { id }})
        res.json(reqGame);
    } catch(err) {
        next(err)
    }

});

    export default router;