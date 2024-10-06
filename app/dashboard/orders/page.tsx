import React from "react";
import { FC } from "react";
import OrderTable from "./components/OrderTable";

const OrdersDashboardPage: FC = () => {
  return (
    <>
      <div className="p-10 flex flex-col gap-5">
        <h1 className="text-xl font-bold">Order List</h1>
        <div className="h-2 w-full bg-gray-200 rounded-lg "></div>
        <div>
            <OrderTable />
        </div>
      </div>
    </>
  );
};

export default OrdersDashboardPage;
