"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard: FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user?.role !== "admin" && session.user?.role !== "warehouse_admin") {
        router.push("/"); // Redirect non-admins to the homepage
      }
    } else if (status === "unauthenticated") {
      router.push("/"); // Redirect unauthenticated users
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default Dashboard;
