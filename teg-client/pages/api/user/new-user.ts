import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const { API_URL } = process.env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, alias } = req.body;

    axios.post(`${API_URL}/user/new-user`,{ id, alias })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err))
};