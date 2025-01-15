"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouteToDashboard() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); 
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="loader"></div>; 
  }

  return null;
}
