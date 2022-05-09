import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const { API_URL } = process.env;

export default async function ArmiesCountries(req: NextApiRequest, res: NextApiResponse) {
    const { game_id } = req.query
    console.log(game_id)
    axios.get(`${API_URL}/game/armies-countries?game_id=${game_id}`)
    .then((response) => {
        if (response.status !== 200) return res.status(response.status).send('err')
        return res.json(response.data)
    })
    .catch((err) => {return res.send(err)})

}