import { Router } from 'express';
import HttpException from '../../../exceptions/HttpExceptions';
import Game from '../../../db/models/Game';
import Player from '../../../db/models/Player';

const router = Router();

router.post('/',async (req,res,next) => {
    const { loggedPlayerId, gameId } = req.body;
    let player: Player | null, game: Game | null;
    try {
        player = await Player.findByPk(loggedPlayerId);
        const include = [{ model: Player, as: 'players' },{ model: Player, as: 'nextPlayer' }];
        game =  await Game.findByPk(gameId,{ include });
    } catch(err) { console.error(err); return next(new HttpException(500,'Hubo un problema en la base de datos.')) }

    if (!player) return next(new HttpException(400,'No existe un jugador con ese id.'));
    if (!game) return next(new HttpException(400,'No existe una partida con ese id.'));
    if (game.nextPlayerId !== loggedPlayerId) return next(new HttpException(400,'No puedes realizar esta acción.'));

    // this column is true when player won at least one country.
    // if it is false can't regroup, so nextPlayer is setted
    // and status is 5addArmies
    // if it is true, only sets status in regroup
    if (game.canRegroup) game.statusId = 7;
    else {
        const orderNextPlayer = game.nextPlayer.order === game.maxPlayers ? 1 : game.nextPlayer.order + 1;
        const nextPlayerId = game.players.find((player) => player.order === orderNextPlayer)?.id;
        if (typeof nextPlayerId === 'string') {
            game.nextPlayerId = nextPlayerId;
        }
        // Si es el primer turno 
        // el siguiente status es 6, nextPlayer ataca sin agregar ejércitos
        if (!game.round) {
            game.round = 1;
            game.statusId = 6;
        } else {
            game.round++
            game.statusId = 5;
        }
    } 
    await game.save()

    res.json({ gameId });
});

export default router;