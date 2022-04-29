import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
    database: 'tegdb',
    dialect: 'postgres',
    username: 'martinnegro',
    password: 'mor2410kista',
    logging: false,
    models: [__dirname + '/models/*.ts']
})

export const conn = sequelize;
export default sequelize.models;