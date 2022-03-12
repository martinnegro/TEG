import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id_game } = req.query

    axios.get(`http://localhost:4000/colors/${id_game}`)
    .then((response) => {
        res.send(response.data)
    })
    .catch((err) => res.send(err))
};