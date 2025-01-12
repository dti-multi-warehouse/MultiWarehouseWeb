"use client";

import React, { useState } from "react";

interface WarehouseFilterProps {
  onFilterChange: (filters: { name?: string; city?: string; province?: string }) => void;
}

const WarehouseFilter: React.FC<WarehouseFilterProps> = ({ onFilterChange }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const filters = {
      name: value,
      city: value,
      province: value,
    };
    onFilterChange(filters); 
  };

  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
      <input
        type="text"
        name="query"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by name, city, or province..."
        className="border rounded-lg p-2 w-full sm:w-auto text-sm"
      />
    </div>
  );
};

export default WarehouseFilter;
