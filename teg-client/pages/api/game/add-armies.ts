import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
const { API_URL } = process.env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req

    try {
        const { data: gameId } = await axios.post(`${API_URL}/game/add-armies/`,body);
        res.json(gameId)
    } catch(err) { res.status(500).send('error') }
};