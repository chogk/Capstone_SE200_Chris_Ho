import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 🔐 Replace with your own logic or DB validation
        if (credentials?.email === "admin@example.com" && credentials.password === "admin") {
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }
        return null;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.user.image = token.picture as string || "/default-avatar.png"
      return session
    },
    async jwt({ token }) {
      if (token?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        })
        if (dbUser?.image) {
          token.picture = dbUser.image
        }
      }
      return token
    },
  },
  
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
