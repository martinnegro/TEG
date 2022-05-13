import { Model, ModelCtor } from "sequelize";

import colors from './colors';
import statuses from './statuses';
import countries from './countries';
import continents from './continents';
import bordering from './bordering'
import { dateGen } from "../../utils/dateGen";

type ModelSeq = ModelCtor<Model<any, any>>

export default async function preloadDb(colorModel: ModelSeq, statusModel: ModelSeq, continentModel: ModelSeq, countryModel: ModelSeq, borderingModel: ModelSeq) {
    try{  
        console.log(dateGen() + ' ---> Loading DB')
        await colorModel.bulkCreate(colors);
        await statusModel.bulkCreate(statuses);
        await continentModel.bulkCreate(continents);
        await countryModel.bulkCreate(countries);
        await borderingModel.bulkCreate(bordering);
        console.log(dateGen() + ' ---> DB Loaded')
    } catch(err) { console.log(err) }
};