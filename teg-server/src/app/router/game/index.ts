import { Router } from "express";
import activeGames from './active-games';
import game from './game';
import newGame from './new-game';
import availableGames from './available-games'
import joinGame from './join-game'


const router = Router();

router.use('',game);
router.use('/new-game',newGame);
router.use('/active-games',activeGames);
router.use('/available-games',availableGames);
router.use('/join-game',joinGame)

export default router;