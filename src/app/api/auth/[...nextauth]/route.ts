import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

const authin: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/auth/signin'
  },
  
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/v1/auth/signin`, {
          method: 'POST',
          headers: {
            'content-type': "application/json"
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });

        const data = await res.json();
        
        if (data.message === "success") {
          const dataa: { id: string } = jwtDecode(data.token);
          
          return {
            id: dataa.id,
            token: data.token,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role
          };
        } else {
          throw new Error(data.message);
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = {
          id: token.user.id,
          name: token.user.name,
          email: token.user.email,
          role: token.user.role
        };
      }
      session.token = token.token ?? "";
      return session;
    }
  }
};

const handler = NextAuth(authin);
export { handler as GET, handler as POST };



