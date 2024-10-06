import {FC} from "react";
import WarehouseTable from "./components/WarehouseTable";
import AddWarehouse from "./components/AddWarehouse";
import React from "react";

const WarehouseDashboardPage: FC = () => {
    return(
        <>
        <div className="p-10 flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Warehouse Dashboard</h1>
                <AddWarehouse />
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-lg "></div>
            <div>
                <WarehouseTable />
            </div>
        </div>
        </>
    ) 
}

export default WarehouseDashboardPage