import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      role?: string;
      social?: boolean;
      warehouseId?: number;
      warehouseName?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    token: string;
    id?: string;
    role?: string;
    social?: boolean;
    warehouseId?: number;
    warehouseName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: string;
    role?: string;
    social?: boolean;
    warehouseId?: number;
    warehouseName?: string;
  }
}
