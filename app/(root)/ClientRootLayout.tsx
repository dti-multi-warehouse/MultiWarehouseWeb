'use client';

import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStores";

export default function ClientRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setUser = useAuthStore((state: any) => state.setUser);
  const clearUser = useAuthStore((state: any) => state.clearUser);
  const isAdmin = useAuthStore((state: any) => state.isAdmin);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        role: session.user.role,
        accessToken: session.accessToken,
      });
      if (isAdmin()) {
        router.push("/dashboard");
      }
    }
  }, [status, session, router, setUser, clearUser, isAdmin]);

  if (status === "loading") {
    return <div className=" flex flex-col gap-5 items-center justify-center h-screen w-screen"><p className="font-bold text-red-600 text-2xl animate-bounce duration-1000">AlphaMarch</p></div>;
  }

  return <>{children}</>;
}