"use client";

import React, { useState, useEffect } from "react";
import Buttons from "@/components/Buttons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LiaSortSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import WarehouseUpdate from "./WarehouseUpdate";
import { useSearchWarehouses, useDeleteWarehouse } from "@/hooks/useWarehouse";
import AdminAssignee from "./AdminAssignee";
import SkeletonTableRow from "../../components/SkeletonTableRow";
import WarehouseDrawer from "./WarehouseDrawer";

interface WarehouseTableProps {
  filters: { name?: string; city?: string; province?: string };
}

const WarehouseTable: React.FC<WarehouseTableProps> = ({ filters }) => {
  const [page, setPage] = useState(0);
  const [isXL, setIsXL] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { data, isLoading, isError, refetch } = useSearchWarehouses({
    ...filters,
    page,
    size: 10,
    sortField,
    sortDirection,
  });

  const deleteWarehouseMutation = useDeleteWarehouse();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const handleResize = () => setIsXL(mediaQuery.matches);
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleRowClick = (warehouse: any) => {
    if (!isXL) {
      setSelectedWarehouse(warehouse);
      setIsDrawerOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      deleteWarehouseMutation.mutate(id, {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error("Error deleting warehouse:", error);
        },
      });
    }
  };

  const handleWarehouseUpdate = (updatedWarehouse: any) => {
    setSelectedWarehouse(updatedWarehouse);

    refetch();
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (isError) return <div>Failed to load warehouses.</div>;

  const { content: warehouses = [], totalPages = 0 } = data?.data || {};

  return (
    <>
      <Table className="border rounded-xl">
        <TableCaption>A list of warehouses.</TableCaption>
        <TableHeader>
        <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Warehouse <LiaSortSolid/>
                {sortField === 'name' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </div>
            </TableHead>
            <TableHead className="max-xl:hidden">
              <div className="flex items-center gap-1 cursor-pointer">
                Street
              </div>
            </TableHead>
            <TableHead className="max-md:hidden">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort('city')}
              >
                City <LiaSortSolid />
                {sortField === 'city' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </div>
            </TableHead>
            <TableHead className="max-lg:hidden">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort('province')}
              >
                Province <LiaSortSolid />
                {sortField === 'province' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </div>
            </TableHead>
            <TableHead className="max-lg:hidden">Admin Assignee</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {isLoading && <SkeletonTableRow col={7} />}
          {warehouses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No warehouses found.
              </TableCell>
            </TableRow>
          ) : (
            warehouses.map((warehouse: any, index: number) => (
              <TableRow
                key={warehouse.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(warehouse)}
              >
                <TableCell className="font-medium">#{page * 10 + index + 1}</TableCell>
                <TableCell>{warehouse.name}</TableCell>
                <TableCell className="max-xl:hidden">{warehouse.street}</TableCell>
                <TableCell className="max-md:hidden">{warehouse.city}</TableCell>
                <TableCell className="max-lg:hidden">{warehouse.province}</TableCell>
                <TableCell className="max-lg:hidden">
                  <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                    <AdminAssignee
                      warehouseId={warehouse.id}
                      assignedAdminName={warehouse.adminUsername}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <div onClick={(e) => e.stopPropagation()}>
                    <WarehouseUpdate warehouseId={warehouse.id} />
                  </div>
                  <Buttons
                    onClick={(e: any) => {
                      e.stopPropagation();
                      handleDelete(warehouse.id);
                    }}
                    className="bg-white text-xs md:text-sm !gap-1 !px-3 !text-red-600 border border-red-600 !rounded-lg"
                  >
                    <RiDeleteBin6Line />
                    Del
                  </Buttons>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink href="#" onClick={() => setPage(index)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages + 1))
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Drawer */}
      <WarehouseDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        warehouse={selectedWarehouse}
        onUpdateWarehouse={handleWarehouseUpdate}
      />
    </>
  );
};

export default WarehouseTable;
