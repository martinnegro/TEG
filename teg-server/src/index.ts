import http from 'http';
import app from './app';
import { dateGen } from './utils/dateGen';

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(dateGen() + ` ---> Server listening in port ${PORT}`)
});