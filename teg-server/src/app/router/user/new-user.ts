import { Router } from "express";
import HttpException from "../../../exceptions/HttpExceptions";

import Models from '../../../db'


const router = Router();

router.post('', async (req, res, next) => {
    const { id, alias } = req.body;

    if (!id || id === undefined || !alias || alias === undefined) return next(new HttpException(400, 'Alias or id are missing.'));

    const { User } = Models;

    try {
        await User.update({ alias },{ where: { id } })
        const resUser = await User.findOne({ where: { id } });
        res.json(resUser);
    } catch (err) {
        next(err);
    }
});

export default router;