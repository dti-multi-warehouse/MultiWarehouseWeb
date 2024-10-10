import React from "react";
import { FC } from "react";
import OrderTable from "./components/OrderTable";
import WarehousePicker from "@/app/dashboard/components/WarehousePicker";

const OrdersDashboardPage: FC = () => {
  return (
    <>
      <div className="p-4 lg:p-10 space-y-5">
        <h1 className="text-xl font-bold">Order List</h1>
          <WarehousePicker />
        <div className="h-2 w-full bg-gray-200 rounded-lg "></div>
        <div>
            <OrderTable />
        </div>
      </div>
    </>
  );
};

export default OrdersDashboardPage;
