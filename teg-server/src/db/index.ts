import { Sequelize } from 'sequelize-typescript';
import Account from './models/Account';
import ArmyCountry from './models/ArmyCountry';
import BorderingCountries from './models/BorderingCountries';
import Color from './models/Color';
import Continent from './models/Continent';
import Country from './models/Country';
import Game from './models/Game';
import Player from './models/Player';
import Session from './models/Session';
import Status from './models/Status';
import User from './models/User';
import VerificationToken from './models/VerificationToken';
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

console.log(sequelize.models)

export const conn = sequelize;
export default sequelize.models;