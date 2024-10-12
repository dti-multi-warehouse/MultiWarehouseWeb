import { NextAuthOptions } from "next-auth";
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
        warehouseId: { label: "WarehouseId", type: "number" },
        warehouseName: { label: "WarehouseName", type: "text" },
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
              if (response.data.role) {
                return {
                  id: response.data.userId,
                  token: response.data.accessToken,
                  email: response.data.email,
                  role: response.data.role || "user",
                  social: false,
                  warehouseId: response.data.warehouseId,
                  warehouseName: response.data.warehouseName
                };
              }

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
              if (response.data.role) {
                return {
                  id: response.data.userId,
                  token: response.data.accessToken,
                  email: response.data.email,
                  role: response.data.role || "user",
                  social: false,
                  warehouseId: response.data.warehouseId,
                  warehouseName: response.data.warehouseName
                }
              }
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
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        // secure: process.env.NODE_ENV !== 'development',
        // domain: process.env.NODE_ENV === 'development' ? 'localhost' : 'dev.alphamarch.shop',
        secure: true,
        // domain: '.alphamarch.shop'
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        // secure: process.env.NODE_ENV !== 'development',
        secure: true,
      },
    },
  },  
  session: {
    strategy: "jwt",
    maxAge: 10 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 10 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.email = user.email;
        token.social = user.social;
        token.role = user.role;
        token.warehouseId = user.warehouseId
        token.warehouseName = user.warehouseName
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
        warehouseId: token.warehouseId,
        warehouseName: token.warehouseName
      };
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};