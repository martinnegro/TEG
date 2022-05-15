import { Sequelize } from 'sequelize-typescript';
import Account from '../src/db/models/Account';
import ArmyCountry from '../src/db/models/ArmyCountry';
import BorderingCountries from '../src/db/models/BorderingCountries';
import Color from '../src/db/models/Color';
import Continent from '../src/db/models/Continent';
import Country from '../src/db/models/Country';
import Game from '../src/db/models/Game';
import Player from '../src/db/models/Player';
import Session from '../src/db/models/Session';
import Status from '../src/db/models/Status';
import User from '../src/db/models/User';
import VerificationToken from '../src/db/models/VerificationToken';
import preloadDb from './preloadDb';
import { dateGen } from '../src/utils/dateGen';
const dotenv = require('dotenv');
dotenv.config()

const { DATABASE_URL } = process.env

const sequelize = new Sequelize(DATABASE_URL!,{
    logging: false,
    ssl: true,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    models: [User,Game,Player,Status,Continent,Country,Color,ArmyCountry,BorderingCountries,Account,Session,VerificationToken]
})

    console.log(dateGen() + ' >--- Connecting to DB...')
sequelize.sync({ force: true })
.then(async () => {
    console.log(dateGen() + ' ->-- Connected.')
    console.log(dateGen() + ' -->- Creating Data...')
    const {   Color:ColorG, Status:StatusG, Continent:ContinentG, Country:CountryG, BorderingCountries:BorderingCountriesG  } = sequelize.models
    await preloadDb(ColorG,StatusG,ContinentG,CountryG,BorderingCountriesG)
    console.log(dateGen() + ' --> Done.')
    sequelize.close()
})
.catch((err) => {
    console.log(dateGen() + ' ->>> ' + err.message)
    console.error('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
    console.error(err)
})

