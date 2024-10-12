import { FC } from "react";
import WarehousePicker from "@/app/dashboard/components/WarehousePicker";
import MonthPicker from "@/app/dashboard/components/MonthPicker";
import DashboardCharts from "@/app/dashboard/components/DashboardCharts";

const Dashboard: FC = () => {

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