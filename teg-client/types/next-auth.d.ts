import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
        alias: string
        } & DefaultSession["user"],
        id: string
    }
}