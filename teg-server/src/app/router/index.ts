import { Router } from "express";
import battle from './battle';
import newUser from './new-user';
import colors from './colors';
import game from './game'

const router = Router();

router.use('',battle);
router.use('',newUser);
router.use('',colors);
router.use('/game',game)

export default router;