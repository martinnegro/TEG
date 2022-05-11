import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter"
import { Sequelize, DataType, DataTypes } from "sequelize"

const {  DB_URI } = process.env

const sequelize = new Sequelize(DB_URI,{
    ssl: true,
    dialectOptions: {
        ssl:{
            rejectUnauthorized: false,
        }
    },
    logging: false
})

//sequelize.sync({ force: true })

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
                refreshToken: {
                    type: DataTypes.STRING,
                },
                accessToken: {
                    type: DataTypes.STRING,
                },
                expiresAt: {
                    type: DataTypes.INTEGER,
                },
                tokenType: {
                    type: DataTypes.STRING,
                },
                scope: {
                    type: DataTypes.STRING,
                },
                sessionState: {
                    type: DataTypes.STRING,
                },              
                idToken: DataTypes.STRING(5000)
            },{ underscored: true }),
            User: sequelize.define('user',{
                ...models.User,
                id: { 
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true
                },
                alias: DataTypes.STRING(10),
                emailVerified: DataTypes.DATE
            },{ underscored: true }),
            Session: sequelize.define('session',{
                ...models.Session
            },{ underscored: true }),
            VerificationToken: sequelize.define('verificationToken',{
                ...models.VerificationToken
            },{ underscored: true })
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
    // secret: process.env.NEXTAUTH_SECRET,
};

const exportNextAuth = async (req, res) => await NextAuth(req, res, options);

export default exportNextAuth;

