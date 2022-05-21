import { Sequelize } from 'sequelize-typescript';
import Account from '../db/models/Account';
import ArmyCountry from '../db/models/ArmyCountry';
import BorderingCountries from '../db/models/BorderingCountries';
import Color from '../db/models/Color';
import Continent from '../db/models/Continent';
import Country from '../db/models/Country';
import Game from '../db/models/Game';
import Player from '../db/models/Player';
import Session from '../db/models/Session';
import Status from '../db/models/Status';
import User from '../db/models/User';
import VerificationToken from '../db/models/VerificationToken';
import preloadDb from './preloadDb';
import { dateGen } from '../utils/dateGen';
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

