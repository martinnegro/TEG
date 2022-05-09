import { Sequelize } from 'sequelize-typescript';
import ArmyCountry from './models/ArmyCountry.model';
import BorderingCountries from './models/BorderingCountries.model';
import Color from './models/Color.model';
import Continent from './models/Continent.model';
import Country from './models/Country.model';
import Game from './models/Game.model';
import Player from './models/Player.model';
import Status from './models/Status.model';
import User from './models/User.model';
const dotenv = require('dotenv');
dotenv.config()

const { DATABASE_URL } = process.env

const sequelize = new Sequelize(DATABASE_URL!,{
    logging: false,
    ssl: true,
    models: [User,Game,Player,Status,Continent,Country,Color,ArmyCountry,BorderingCountries]
})

console.log(sequelize.models)

export const conn = sequelize;
export default sequelize.models;