"use client";

import React, { useState } from "react";
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
import WarehouseUpdate from "./WarehouseUpdate";
import { useSearchWarehouses, useDeleteWarehouse } from "@/hooks/useWarehouse"; 
import { toast } from "sonner";

const WarehouseTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, refetch } = useSearchWarehouses({
    page,
    size: 10,
  });

  const deleteWarehouseMutation = useDeleteWarehouse();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      deleteWarehouseMutation.mutate(id, {
        onSuccess: () => {
          toast("Warehouse deleted", {
            description: "The warehouse has been successfully deleted.",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo Delete"),
            },
          });
          refetch();
        },
        onError: (error) => {
          toast("Failed to delete warehouse", {
            description: "An error occurred while deleting the warehouse.",
          });
          console.error("Error deleting warehouse:", error);
        },
      });
    }
  };

  if (isLoading) return <div>Loading warehouses...</div>;
  if (isError) return <div>Failed to load warehouses.</div>;

  const { content: warehouses = [], totalPages = 0 } = data?.data || {};

  return (
    <>
      <Table className="border rounded-xl">
        <TableCaption>A list of warehouses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Warehouse</TableHead>
            <TableHead>Street</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Province</TableHead>
            <TableHead>Admin Assignee</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {warehouses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No warehouses found.
              </TableCell>
            </TableRow>
          ) : (
            warehouses.map((warehouse: any) => (
              <TableRow key={warehouse.id}>
                <TableCell className="font-medium">#{warehouse.id}</TableCell>
                <TableCell>{warehouse.name}</TableCell>
                <TableCell>{warehouse.street}</TableCell>
                <TableCell>{warehouse.city}</TableCell>
                <TableCell>{warehouse.province}</TableCell>
                <TableCell>{warehouse.adminUsername}</TableCell>
                <TableCell className="text-right flex justify-end gap-5">
                  <WarehouseUpdate warehouseId={warehouse.id} />
                  <Buttons
                    onClick={() => handleDelete(warehouse.id)}
                    className="bg-white !text-red-600 border border-red-600"
                  >
                    Delete
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
                      <PaginationLink
                        href="#"
                        onClick={() => setPage(index)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages - 1))
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default WarehouseTable;
