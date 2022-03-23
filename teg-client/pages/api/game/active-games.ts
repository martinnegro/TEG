import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import axios from 'axios';

interface Game {
    id_next_player: string,
    next_player?: {}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = await getSession({ req });

    try {
        const { data: activeGames } = await axios.get<Game[]>(`http://localhost:4000/game/active-games/${id}`);

        for (let game of activeGames) {
            const { id_next_player } = game;
            if (id_next_player) {
                const { data: next_player } = await axios.get(`http://localhost:4000/user/get-user-game-name?id=${id_next_player}`)
                game.next_player = next_player
            }
        }

        res.json(activeGames)
    } catch(err) { res.status(500).send('error') }
};