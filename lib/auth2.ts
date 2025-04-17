// lib/auth.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    // Extend JWT token with name (for OAuth logins like GitHub)
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name; // Store user's name in token
        token.id = user.id;     // Store user's id in token
      }
      return token;
    },

    // Attach name/id from token to session
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Optional: customize your login page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
