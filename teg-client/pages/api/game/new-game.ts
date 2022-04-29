import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { getSession } from 'next-auth/react';

const { API_URL } = process.env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const body: NewGameRequestBody = req.body;
    const session = await getSession({ req });
    body.userId = session.id;

    const response = await axios.post(`${API_URL}/game/new-game`,body);

    if ( response.status !== 200 ) res.status(response.status).send(response.data);
    else res.json(response.data)
    
};