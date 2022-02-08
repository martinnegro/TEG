import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './router';
import { error_handler } from './error_handler';


const app =  express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(router);
app.use(error_handler)

export default app;