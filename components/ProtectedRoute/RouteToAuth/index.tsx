"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouteToAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); 
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  return null;
}
