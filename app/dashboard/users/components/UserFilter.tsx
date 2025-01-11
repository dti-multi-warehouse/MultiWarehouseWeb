"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFilterProps {
  onFilterChange: (filters: { role?: string; query?: string }) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({ role: "", query: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleRoleChange = (value: string) => {
    const updatedFilters = { ...filters, role: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); 
  };

  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
      {/* Filter by Role */}
      <Select onValueChange={handleRoleChange}>
        <SelectTrigger className="border rounded-lg p-2 w-full sm:w-auto text-sm">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=" ">All Roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="warehouse_admin">Warehouse Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>

      {/* Search by Username or Email */}
      <input
        type="text"
        name="query"
        value={filters.query}
        onChange={handleInputChange}
        placeholder="Search by username or email..."
        className="border rounded-lg p-2 w-full sm:w-auto xl:max-w-[220px] text-sm"
      />
    </div>
  );
};

export default UserFilter;
