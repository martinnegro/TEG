import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const { API_URL } = process.env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    axios.get(`${API_URL}/colors`)
    .then((response) => {
        res.send(response.data)
    })
    .catch((err) => res.send(err))
};