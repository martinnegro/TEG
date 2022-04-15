import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import axios from 'axios';
const { API_URL } = process.env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = await getSession({ req });

    try {
        const { data } = await axios.get(`${API_URL}/game/available-games/${id}`);
        res.json(data)
    } catch(err) { res.status(500).send('error') }
};