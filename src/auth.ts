import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectdb from "./lib/db";
import userModel from "./models/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { connect } from "mongoose";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, request) {
        try {
          await connectdb();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const email = credentials?.email as string;
          const password = credentials?.password as string;
          const userDoc = await userModel.findOne({ email });

          if (!userDoc) {
            throw new Error("User does not exist");
          }

          if (!userDoc.password) {
            throw new Error(
              "This account has no password. Please login with Google.",
            );
          }
          const isMatch = await bcrypt.compare(password, userDoc.password);

          if (!isMatch) {
            throw new Error("incorrect password");
          }

          return {
            id: userDoc._id.toString(),
            name: userDoc.name,
            email: userDoc.email,
            role: userDoc.role,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // this parameter user is user returned by google after verification from its database
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectdb();

        let dbUser = await userModel.findOne({ email: user.email });

        if (!dbUser) {
          dbUser = await userModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        } else if (!dbUser.image && user.image) {
          dbUser.image = user.image;
          await dbUser.save();
        }

        user.id = dbUser._id.toString();
        user.role = dbUser.role;
        user.image = dbUser.image;
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        ((token.id = user.id),
          (token.name = user.name),
          (token.email = user.email),
          (token.role = user.role),
          (token.image = user.image));
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        ((session.user.id = token.id as string),
          (session.user.name = token.name as string),
          (session.user.email = token.email as string),
          (session.user.role = token.role as string),
          (session.user.image = token.image as string));
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  },
  secret: process.env.AUTH_SECRET,
});
