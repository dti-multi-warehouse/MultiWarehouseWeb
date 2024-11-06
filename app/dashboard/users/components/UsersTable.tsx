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
import UpdateWarehouseAdmin from "./UpdateWarehouseAdmin";
import { useSearchUsers, useDeleteWarehouseAdmin } from "@/hooks/useAdmin";
import { toast } from "sonner";

const UsersTable: React.FC = () => {
  const [page, setPage] = useState(0);
  
  const { data, isLoading, isError, refetch } = useSearchUsers({
    page,
    size: 10, 
  });

  const deleteWarehouseAdminMutation = useDeleteWarehouseAdmin();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteWarehouseAdminMutation.mutate(id, {
        onSuccess: () => {
          toast.success("User deleted", {
            description: "The user has been successfully deleted.",
          });
          refetch(); 
        },
        onError: () => {
          toast.error("Failed to delete the user.");
        },
      });
    }
  };

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Failed to load users.</div>;

  const { content: users = [], totalPages = 0 } = data || {}; 

  return (
    <>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
           users.map((user: any, index: number) => (
              <TableRow key={user.id}>
                <TableCell className="font-semibold">#{" "}{index+1}</TableCell>
                <TableCell className="capitalize">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className={`text-right justify-end gap-5 ${user.role !== "warehouse_admin" ? "hidden" : "flex"}`}>
                  <UpdateWarehouseAdmin adminId={user.id} />
                  <Buttons
                    onClick={() => handleDelete(user.id)}
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
            <TableCell colSpan={5}>
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
                      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages + 1))}
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

export default UsersTable;