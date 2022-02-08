import { ErrorRequestHandler } from 'express';
import { dateGen } from '../../utils/dateGen';

export const error_handler: ErrorRequestHandler = (err: HttpException, _req, res, next) => { 
    const status = err.status || 500;
    const message = err.message || err;
    console.log(dateGen() + ` :::: RESPONSE ERROR: STATUS: ${status} -- MESSAGE: ${message}`)
    res.status(status).send(message);
    next()
};