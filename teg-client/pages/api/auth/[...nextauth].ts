import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter"
import { Sequelize, DataType, DataTypes } from "sequelize"

const sequelize = new Sequelize('tegdb', 'martinnegro','mor2410kista',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
})

// sequelize.sync({ force: true })

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent'
                }
            },
            
        }),
    ],
    adapter: SequelizeAdapter(sequelize,{
        models: {
            Account: sequelize.define('account',{
                ...models.Account,                
                id_token: DataTypes.STRING(5000)
            }),
            User: sequelize.define('user',{
                ...models.User,
                id: { 
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true
                },
                alias: DataTypes.STRING(10),
                emailVerified: DataTypes.BOOLEAN
            })
        }
    }),
    callbacks: {
        async session({ session, token, user }) {
          session.id = user.id;
          session.user.alias =  user.alias
          return session
        }
    },
    pages: {
        newUser: '/player/new-user'
    },
    debug: false,
    secret: 'aper',
};

const exportNextAuth = async (req, res) => await NextAuth(req, res, options);

export default exportNextAuth;

