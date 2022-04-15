import axios from "axios";
const { API_URL } = process.env

export default async function handler(req, res) {
    const { id } = req.query
    if (!id || id === 'undefined') return res.status(400).send('Missing Id')
    try {   
        const response = await axios.get(`${API_URL}/game/${id}`);
        res.json(response.data)
    } catch(err) { res.send(err) }
}
  