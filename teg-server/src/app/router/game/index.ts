import { Router } from "express";
import activeGames from './active-games';
import game from './game';
import newGame from './new-game';
import availableGames from './available-games'
import joinGame from './join-game';
import armiesCountries from './armies-countries';
import addArmies from './add-armies';
import battle from "./battle";
import finishAttack from './finish-attack';


const router = Router();

router.use('/new-game',newGame);
router.use('/active-games',activeGames);
router.use('/available-games',availableGames);
router.use('/join-game',joinGame);
router.use('/armies-countries',armiesCountries);
router.use('/add-armies',addArmies);
router.use('/battle',battle);
router.use('/finish-attack',finishAttack);
router.use('',game);

export default router;