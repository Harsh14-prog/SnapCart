import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectdb from "./lib/db";
import user from "./models/user.model";
import bcrypt from "bcryptjs";

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
          const userDoc = await user.findOne({ email });

          if (!userDoc) {
            throw new Error("User does not exist");
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
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        ((token.id = user.id),
          (token.name = user.name),
          (token.email = user.email),
          (token.role = user.role));
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        ((session.user.id = token.id as string),
          (session.user.name = token.name as string),
          (session.user.email = token.email as string),
          (session.user.role = token.role as string));
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
