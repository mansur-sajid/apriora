import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const authOptions = {
  session: {
    strategy: 'jwt' as const
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
}
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions); 
