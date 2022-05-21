import { Model, ModelCtor } from "sequelize";

import colors from './colors';
import statuses from './statuses';
import countries from './countries';
import continents from './continents';
import bordering from './bordering'


type ModelSeq = ModelCtor<Model<any, any>>

export default async function preloadDb(colorModel: ModelSeq, statusModel: ModelSeq, continentModel: ModelSeq, countryModel: ModelSeq, borderingModel: ModelSeq) {
    try{  
        console.log('Loading DB')
        try {
            await colorModel.bulkCreate(colors);
            console.log(/*dateGen()*/` ---> ${colorModel.name}`)
        } catch (err) { console.log(/*dateGen()*/` ->>> No se pudo crear model ${colorModel.name}`) }
        try {
            await statusModel.bulkCreate(statuses);
            console.log(/*dateGen()*/` ---> ${statusModel.name}`)
        } catch (err) { console.log(/*dateGen()*/` ->>> No se pudo crear model ${statusModel.name}`) }
        try{
            await continentModel.bulkCreate(continents);
            console.log(/*dateGen()*/` ---> ${continentModel.name}`)
        } catch (err) { console.log(/*dateGen()*/` ->>> No se pudo crear model ${continentModel.name}`) }
        try{
            await countryModel.bulkCreate(countries);
            console.log(/*dateGen()*/` ---> ${countryModel.name}`)
        } catch (err) { console.log(/*dateGen()*/` ->>> No se pudo crear model ${countryModel.name}`) }
        try{
            await borderingModel.bulkCreate(bordering);
            console.log(/*dateGen()*/` ---> ${borderingModel.name}`)
        } catch (err) { console.log(/*dateGen()*/` ->>> No se pudo crear model ${borderingModel.name}`) }
    } catch(err) { console.log(err) }
};