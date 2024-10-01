"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import WarehousePicker from "@/app/dashboard/components/WarehousePicker";
import MonthPicker from "@/app/dashboard/components/MonthPicker";
import useTotalSales from "@/hooks/useTotalSales";
import useDashboardStore from "@/hooks/useDashboardStore";
import useCategorySales from "@/hooks/useCategorySales";
import useProductSales from "@/hooks/useProductSales";

const Dashboard: FC = () => {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     if (session.user?.role !== "admin" && session.user?.role !== "warehouse_admin") {
  //       router.push("/"); // Redirect non-admins to the homepage
  //     }
  //   } else if (status === "unauthenticated") {
  //     router.push("/"); // Redirect unauthenticated users
  //   }
  // }, [status, session, router]);
  //
  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }
  const warehouse = useDashboardStore(state => state.warehouse)
  const date = useDashboardStore(state => state.date)

  const {data, isLoading, error} = useCategorySales(warehouse.id, date)
  console.log(data)
  return (
    <main>
      <div>
        <h1 className={"text-3xl font-semibold"}>Sales report</h1>
        <div className={"flex max-lg:flex-col justify-between"}>
          <WarehousePicker />
          <div className={"w-64"}>
            <MonthPicker />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
