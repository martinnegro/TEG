import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, alias } = req.body;

    axios.post('http://localhost:4000/game/new-user',{ id, alias })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err))
};