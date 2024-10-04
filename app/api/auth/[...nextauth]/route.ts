import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import apiClient from "@/lib/apiClient";
import { LoginResponse } from "@/types/datatypes";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "password" },
        social: { label: "Social", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        if (credentials.social) {
          try {
            const response = await apiClient.post<LoginResponse>("/api/v1/auth/social-login", {
              email: credentials.email,
              token: credentials.token,
            });

            if (response.data && response.data.accessToken) {
              return {
                id: response.data.userId,
                token: response.data.accessToken,
                email: response.data.email,
                social: true,
                role: response.data.role || "user",
              };
            }
          } catch (error) {
            console.error("Error during social login:", error);
            return null;
          }
        } else if (credentials.password) {
          try {
            const response = await apiClient.post<LoginResponse>("/api/v1/auth/login", {
              email: credentials.email,
              password: credentials.password,
            });

            if (response.data && response.data.accessToken) {
              return {
                id: response.data.userId,
                token: response.data.accessToken,
                email: response.data.email,
                role: response.data.role || "user",
                social: false,
              };
            }
          } catch (error) {
            console.error("Error during login:", error);
            return null;
          }
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile, tokens) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          role: "user",
          social: true,
          token: tokens.access_token || "",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 10,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.email = user.email;
        token.social = user.social;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;

      session.user = {
        id: token.id,
        email: token.email,
        role: token.role || "user",
        social: token.social,
      };

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };