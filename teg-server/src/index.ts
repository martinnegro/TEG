import http from 'http';
import app from './app';
import { dateGen } from './utils/dateGen';
import Models, { conn } from './db';

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

console.log(dateGen() + ` ---> Connecting to database...`)
conn.sync({ force: false }).then(() => {
    console.log(dateGen() + ` ---> Connected.`)
    
    console.log(dateGen() + ` ---> Server starting...`)
    server.listen(PORT, () => {
        console.log(dateGen() + ` ---> Server listening in port ${PORT}...`)
    },);
}).catch((err: Error) => {
    console.log(dateGen() + `->>> Couldn't connect to database`);
    console.log(err.message)
})