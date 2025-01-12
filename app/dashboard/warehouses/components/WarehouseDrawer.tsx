"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
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
import AdminAssignee from "./AdminAssignee";

interface WarehouseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  warehouse: any;
  onUpdateWarehouse: (updatedWarehouse: any) => void;
}

const WarehouseDrawer: React.FC<WarehouseDrawerProps> = ({
  isOpen,
  onClose,
  warehouse,
  onUpdateWarehouse
}) => {
  if (!warehouse){
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Loading Warehouse Details...</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  };
  
  const handleAdminChange = (newAdminName: string | null) => {
    onUpdateWarehouse({ ...warehouse, adminUsername: newAdminName });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Warehouse Details</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <Table className="border rounded-lg">
            <TableCaption>Details of the selected warehouse</TableCaption>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ID</TableCell>
                <TableCell>{warehouse.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Warehouse</TableCell>
                <TableCell>{warehouse.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Street</TableCell>
                <TableCell>{warehouse.street}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">City</TableCell>
                <TableCell>{warehouse.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Province</TableCell>
                <TableCell>{warehouse.province}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Admin Assignee</TableCell>
                <TableCell>
                    <div className="flex flex-col gap-1">
                        <AdminAssignee
                        warehouseId={warehouse.id}
                        assignedAdminName={warehouse.adminUsername}
                        onAdminChange={handleAdminChange}
                        />
                    </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <DrawerFooter>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WarehouseDrawer;
