import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    axios.get('http://localhost:4000/colors')
    .then((response) => {
        res.send(response.data)
    })
    .catch((err) => res.send(err))
};