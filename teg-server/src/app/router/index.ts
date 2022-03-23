import { Router } from "express";
import battle from './battle';
import colors from './colors';
import game from './game'
import user from './user'

const router = Router();

router.use('',battle);
router.use('',colors);
router.use('/game',game);
router.use('/user',user)

export default router;