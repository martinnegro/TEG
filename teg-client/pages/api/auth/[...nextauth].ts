import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
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
    adapter: PrismaAdapter(prisma),
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

