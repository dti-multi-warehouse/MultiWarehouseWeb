"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import WarehousePicker from "@/app/dashboard/components/WarehousePicker";
import MonthPicker from "@/app/dashboard/components/MonthPicker";
import DashboardCharts from "@/app/dashboard/components/DashboardCharts";
import useDashboardStore from "@/hooks/useDashboardStore";

const Dashboard: FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setWarehouse = useDashboardStore(state => state.setWarehouse)
  const setIsAdmin = useDashboardStore(state => state.setIsAdmin)

  useEffect(() => {
    if (status === "authenticated") {
        if (session?.user?.warehouseId && session.user.warehouseName) {
            setWarehouse({
                id: session.user.warehouseId,
                name: session.user.warehouseName
            })
            setIsAdmin(session.user.role === "ADMIN")
        }
        if (session.user?.role !== "ADMIN" && session.user?.role !== "WAREHOUSE_ADMIN") {
        router.push("/"); // Redirect non-admins to the homepage
      }
    } else if (status === "unauthenticated") {
      router.push("/"); // Redirect unauthenticated users
    }
  }, [status, session, router, setWarehouse]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <main className={"p-8 space-y-4"}>
      <div>
        <h1 className={"text-3xl font-semibold"}>Sales report</h1>
        <div className={"flex max-lg:flex-col justify-between"}>
          <WarehousePicker />
          <div className={"w-64"}>
            <MonthPicker />
          </div>
        </div>
      </div>
      <DashboardCharts />
    </main>
  );
};

export default Dashboard;