import { Router } from "express";
import battle from "../../controllers/battle"
import HttpException from "../../exceptions/HttpExceptions";


const router = Router();

router.post('/battle', (req, res, next) => {    
    const { attacker_armys, defender_armys } = req.body;

    if ( 
        attacker_armys < 2 || 
        defender_armys < 1 || 
        attacker_armys === undefined || 
        defender_armys === undefined
    ) {
        const message = 'Armys are undefined or there is an error with the quantity. For the attacker must be greater than 1. For the defender must be greater than 1.'
        const status = 400;
        const err = new HttpException(status, message);
        return next(err)
    }

    const result = battle(attacker_armys, defender_armys);

    res.json(result);
});

export default router;