"use client";

import { FC, useState } from "react";
import CreateWarehouseAdmin from "./components/CreateWarehouseAdmin";
import UsersTable from "./components/UsersTable";
import UserFilter from "./components/UserFilter";

const UsersDashboardPage: FC = () => {
  const [filters, setFilters] = useState<{ role?: string; query?: string }>({
    role: "",
    query: "",
  });

  const handleFilterChange = (newFilters: { role?: string; query?: string }) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="pt-4 px-8 flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-start justify-between">
        <h1 className="text-2xl lg:text-3xl font-semibold">User List Dashboard</h1>
        <div className="flex flex-col gap-3 xl:items-end">
          <CreateWarehouseAdmin />
          <UserFilter onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div>
        <UsersTable filters={filters} />
      </div>
    </div>
  );
};

export default UsersDashboardPage;
