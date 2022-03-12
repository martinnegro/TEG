import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const body = req.body;
    const session = await getSession({ req });
    console.log(session)
    body.id_user = session.id;

    const response = await axios.post('http://localhost:4000/game/new-game',body);

    if ( response.status !== 200 ) res.status(response.status).send(response.data);
    else res.json(response.data)
    
};