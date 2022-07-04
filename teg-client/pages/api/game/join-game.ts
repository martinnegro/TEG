import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import axios from 'axios';

const { API_URL } = process.env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id: userId } = await getSession({ req });
    const { gameId, colorId } = req.body;

    console.log({ colorId })

    try {
        const { data } = await axios.post(`${API_URL}/game/join-game`,{ gameId, userId, colorId});
        res.json(data)
    } catch(err) { res.status(err.status).send('error') }
};