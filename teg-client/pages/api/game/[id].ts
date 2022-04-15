import axios from "axios";
export default async function handler(req, res) {
    const { id } = req.query
    if (!id || id === 'undefined') return res.status(400).send('Missing Id')
    try {   
        const response = await axios.get(`http://localhost:4000/game/${id}`);
        res.json(response.data)
    } catch(err) { res.send(err) }
}
  