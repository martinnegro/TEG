import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = await getSession({ req });

    try {
        const { data } = await axios.get(`http://localhost:4000/game/active-games/${id}`);
        res.json(data)
    } catch(err) { res.status(500).send('error') }
};