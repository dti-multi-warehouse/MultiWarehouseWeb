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
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}