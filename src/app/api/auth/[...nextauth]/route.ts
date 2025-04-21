import NextAuth from "next-auth";
// import {session} from '@/app/api/auth/session'
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID
const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_SECRET

if (!clientId || !clientSecret) {
  throw new Error(
    "Missing Google client ID or client secret environment variables."
  );
}


const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  callbacks: {
    async signIn({  profile }) {
      if (!profile?.email) {
        throw new Error("No Profile");
      }

      return true;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions)
export const GET = handler;
export const POST = handler;
