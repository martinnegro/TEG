import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

const { API_URL } = process.env


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id: userId } = await getSession({ req });

    axios.get(`${API_URL}/finished-games?userId=${userId}`)
    .then(({ data }) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(err.status || 400).send(err.message || 'Ocurrió un error.')
    });
};