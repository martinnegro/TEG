import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { getSession } from 'next-auth/react';

const { API_URL } = process.env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;
    axios.post(`${API_URL}/game/finish-attack`,body)
    .then(({ data }) => {
        res.json(data)
    })
    .catch((err) => res.json(err))
};