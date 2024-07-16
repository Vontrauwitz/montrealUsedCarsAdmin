import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = process.env.ADMIN_EMAILS.split(',');

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (adminEmails.includes(user.email)) {
        return true;
      } else {
        throw new Error('AccessDenied'); // Lanza un error si el correo no está en la lista blanca
      }
    },
    async session({ session, token, user }) {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return null;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Redirigir a la página de error personalizada
  },
  debug: true,
};

export default NextAuth(authOptions);
