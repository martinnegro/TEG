import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import axios from 'axios';
const { API_URL } = process.env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req
    const { id } = await getSession({ req });
    axios.post(API_URL + '/game/battle',{ ...body, userId: id })
    .then(({ data }) => {   
        res.json(data)
    });
};