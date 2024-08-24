import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import apiClient from '@/lib/apiClient';
import { LoginResponse } from '@/types/datatypes';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }
        try {
          console.log('Attempting login with:', credentials.email);
          const response = await apiClient.post<LoginResponse>('/api/v1/login', {
            email: credentials.email,
            password: credentials.password,
          });
          if (response.data && response.data.accessToken) {
            console.log('Successful login, returning user object');
            return {
              id: response.data.userId,
              token: response.data.accessToken,
              email: response.data.email,
              role: response.data.role,
            };
          }
          console.log('Invalid credentials or unexpected response structure');
          return null;
        } catch (error: any) {
          console.error('Authentication error:', error.response?.data || error.message);
          throw new Error(error.response?.data || error.message);
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
      };
      return session;
    }
  },
  pages: {
    signIn: '/sign-in',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
