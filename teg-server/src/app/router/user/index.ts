import { Router } from "express";
import newUser from './new-user';
import getUserGameName from './getUserGameName'

const router = Router();

router.use('/new-user',newUser);
router.use('/get-user-game-name',getUserGameName)

export default router;