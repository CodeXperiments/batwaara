import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  "pages": {
    "signIn": "/login",
    // signOut: "/auth/signout",
    "error": "/login",
  },
  "jwt": {
    "maxAge": 60 * 60 * 24 * 30,
  },
  "callbacks": {
    session({ session }) {
      return session;
    },
  },
  "session": { "strategy": "jwt" },
  "adapter": PrismaAdapter(prisma),
  "providers": [
    GoogleProvider({
      "clientId": env.GOOGLE_CLIENT_ID,
      "clientSecret": env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      "name": "Credentials",
      "credentials": {
        "email": {
          "label": "Email",
          "type": "text",
          "placeholder": "example@gmail.com",
        },
        "password": { "label": "Password", "type": "password" },
      },
      "authorize": async (credentials): Promise<any> => {
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error("Please provide all required fields!");
          }

          const exitingUser = await prisma.user.findUnique({
            "where": {
              "email": credentials?.email,
            },
          });

          if (exitingUser?.email) {
            const match = await bcrypt.compare(
              credentials?.password!,
              exitingUser?.password!
            );

            if (!match) {
              throw new Error("Provided credentials do not match!");
            }

            const user = {
              "email": exitingUser?.email,
              "name": exitingUser?.name,
              "image": exitingUser?.image,
              "emailVerified": exitingUser?.emailVerified,
            };

            return user;
          }
        } catch (error) {
          throw error || new Error("Something went wrong!");
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
