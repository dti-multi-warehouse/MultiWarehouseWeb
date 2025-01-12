"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import Image from "next/image";

interface UserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const UserDrawer: React.FC<UserDrawerProps> = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="w-full text-center">User Details</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 flex flex-col items-center">
          <div className="flex justify-center mb-6">
            <div className="h-[150px] w-[150px]">
              <Image
                src={user.avatar || "/default-user.png"}
                alt={`${user.username || user.email.split("@")[0]}'s avatar`}
                width={150}
                height={150}
                className="object-cover object-center rounded-full h-full w-full"
              />
            </div>
          </div>

          {/* User Details Table */}
          <Table className="border rounded-lg">
            <TableCaption>Details of the selected user</TableCaption>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ID</TableCell>
                <TableCell>{user.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Username</TableCell>
                <TableCell>
                  {user.username || user.email.split("@")[0]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Role</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawer;
