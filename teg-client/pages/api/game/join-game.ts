import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import axios from 'axios';

const { API_URL } = process.env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id: id_user } = await getSession({ req });
    const { id_game, id_color } = req.body;

    try {
        const { data } = await axios.post(`${API_URL}/game/join-game`,{ id_game, id_user, id_color});
        res.json(data)
    } catch(err) { res.status(err.status).send('error') }
};