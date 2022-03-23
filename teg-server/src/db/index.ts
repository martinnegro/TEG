import { Sequelize, ModelCtor } from 'sequelize-typescript';
import models from './models'

let modelsArray: ModelCtor[] = [];

let model: keyof typeof models;
for (model in models) {
    modelsArray.push(models[model])
}

const sequelize = new Sequelize({
    database: 'tegdb',
    dialect: 'postgres',
    username: 'martinnegro',
    password: 'mor2410kista',
    logging: false,
    // storage: ':memory:',
    models: modelsArray
})

export const conn = sequelize;
export default sequelize.models;