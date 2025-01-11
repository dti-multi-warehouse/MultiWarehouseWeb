"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const WarehouseTable = dynamic(() => import("./components/WarehouseTable"), { ssr: false });
const AddWarehouse = dynamic(() => import("./components/AddWarehouse"), { ssr: false });
const WarehouseFilter = dynamic(() => import("./components/WarehouseFilter"), { ssr: false });

const WarehouseDashboardPage: React.FC = () => {
  const [filters, setFilters] = useState<{ name?: string; city?: string; province?: string }>({
    name: "",
    city: "",
    province: "",
  });

  const handleFilterChange = (newFilters: { name?: string; city?: string; province?: string }) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="pt-4 px-8 flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-start justify-between">
        <h1 className="text-2xl lg:text-3xl font-semibold">Warehouse Dashboard</h1>
        <div className="flex flex-col gap-2">
          <AddWarehouse />
          <WarehouseFilter onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div>
        <WarehouseTable filters={filters} />
      </div>
    </div>
  );
};

export default WarehouseDashboardPage;
