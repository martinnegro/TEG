import http from 'http';
import app from './app';
import { dateGen } from './utils/dateGen';
import Models, { conn } from './db';
// import preloadDb from './db/preloadDb/preloadDb';

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

conn.sync({ force: true }).then(() => {
    console.log(dateGen() + ` ---> Connected to database...`)
    const { Color, Status, Continent, Country, BorderingCountries } = Models
    // preloadDb(Color, Status, Continent, Country, BorderingCountries)
    server.listen(PORT, () => {
        console.log(dateGen() + ` ---> Server listening in port ${PORT}...`)
    });
}).catch((err: Error) => {
    console.log(dateGen() + `---> Couldn't connect to database`);
    console.log(err.message)
})