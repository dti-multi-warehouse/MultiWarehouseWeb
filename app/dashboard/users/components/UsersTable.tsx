"use client";

import React, { useEffect, useState } from "react";
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
import UpdateWarehouseAdmin from "./UpdateWarehouseAdmin";
import { useSearchUsers, useDeleteWarehouseAdmin } from "@/hooks/useAdmin";
import { toast } from "sonner";
import SkeletonTableRow from "../../components/SkeletonTableRow";
import UserDrawer from "./UserDrawer";

interface UserTableProps {
  filters: { role?: string; query?: string };
}
const UsersTable: React.FC<UserTableProps> = ({ filters }) => {
  const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { data, isLoading, isError, refetch } = useSearchUsers({
    role: filters.role,
    username: filters.query,
    email: filters.query,
    page,
    size: 10,
    sortField,
    sortDirection,
  });

  const deleteWarehouseAdminMutation = useDeleteWarehouseAdmin();

  useEffect(() => {
    if (data && data.content.length <= 10 && page > 0) {
      setPage(0);
    }
  }, [data, page]);

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

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };  

  if (isError) return <div>Failed to load users.</div>;

  const { content: users = [], totalPages = 0 } = data || {};

  return (
    <>
      <Table className="border rounded-xl">
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">No.</TableHead>
            <TableHead className="">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort('username')}
              >
                Username <LiaSortSolid/>
                {sortField === 'username' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </div>
            </TableHead>
            <TableHead className="max-md:hidden">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort('email')}
              >
                Email <LiaSortSolid />
                {sortField === 'email' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </div>
            </TableHead>
            <TableHead className="max-md:hidden">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort('role')}
              >
                Role <LiaSortSolid/>
                {sortField === 'role' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </div>
            </TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <SkeletonTableRow col={5} />}
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user: any, index: number) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(user)}
              >
                <TableCell className="font-semibold">
                  #{page * 10 + index + 1}
                </TableCell>
                <TableCell className="capitalize">                 
                  {user.username || user.email.split("@")[0]}
                </TableCell>
                <TableCell className="max-md:hidden">                 
                  {user.email}
                </TableCell>
                <TableCell className="max-md:hidden">{user.role}</TableCell>
                {user.role === "warehouse_admin" && (
                  <TableCell
                    className="text-right justify-end gap-2 flex"
                    onClick={(e) => e.stopPropagation()} 
                  >
                    <UpdateWarehouseAdmin adminId={user.id} />
                    <Buttons
                      onClick={() => handleDelete(user.id)}
                      className="bg-white !gap-1 !text-red-600 border border-red-600 !rounded-lg !px-3 text-xs md:text-sm"
                    >
                      <RiDeleteBin6Line />
                      Del
                    </Buttons>
                  </TableCell>
                )}
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

      {/* User Drawer */}
      <UserDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={selectedUser} 
      />
    </>
  );
};

export default UsersTable;
