import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const authOptions = {
  session: {
    strategy: 'jwt' as const
  },
  providers: [
    GoogleProvider({
      clientId: "280462130289-l4715sj9cdo9s1k9ocokcmoik8kh2gm8.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  debug: true,
  secret: "n6n3EdXvue3++hXvqTl+gxjy18fDSvtvuGyQuGehpj0=",
}
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions); 
