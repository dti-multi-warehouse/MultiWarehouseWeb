"use client";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useGetWarehouseAdmins } from "@/hooks/useAdmin";
import { useAssignWarehouseAdmin } from "@/hooks/useWarehouse";
import { Skeleton } from "@/components/ui/skeleton";

const AdminAssignee: React.FC<{
  warehouseId: number;
  assignedAdminName: string | null;
  onAdminChange?: (newAdminName: string | null) => void;
}> = ({ warehouseId, assignedAdminName, onAdminChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);

  const { data: admins = [], isLoading, error, refetch } = useGetWarehouseAdmins();
  const assignAdminMutation = useAssignWarehouseAdmin();
  
  const assignedAdminNames = admins
  .filter((admin: any) => admin.warehouseId !== null)
  .map((admin: any) => admin.username);

  useEffect(() => {
    if (assignedAdminName) {
      const initialAdmin = admins.find(
        (admin: any) => admin.username === assignedAdminName
      );
      setSelectedAdmin(initialAdmin || null); 
      refetch();
    } else {
      setSelectedAdmin(null); 
    }
  }, [assignedAdminName, admins]);

  const handleSelect = (admin: any) => {
    if (selectedAdmin?.username === admin.username) {
      return;
    }

    assignAdminMutation.mutate(
      { warehouseId, userId: admin.id },
      {
        onSuccess: () => {
          setSelectedAdmin(admin); 
          onAdminChange?.(admin.username);
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error assigning admin: ", error);
        },
      }
    );
  };

  const handleUnassign = (e: React.MouseEvent) => {
    e.stopPropagation();

    assignAdminMutation.mutate(
      { warehouseId, userId: null },
      {
        onSuccess: () => {
          setSelectedAdmin(null); 
          onAdminChange?.(null);
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error unassigning admin: ", error);
        },
      }
    );
  };

  if (isLoading) {
    return <Skeleton className="w-28 h-7" />;
  }

  if (error) {
    return <div>Failed to load admins. Please try again.</div>;
  }

  return (
    <Popover open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between capitalize"
        >
          {selectedAdmin ? (
            <div className="capitalize flex items-center justify-between gap-1 w-full max-w-28">
              {selectedAdmin.username}
              <button
                className="text-gray-100 hover:scale-105 bg-gray-700 hover:bg-red-600 shadow-boxedSoft shadow-gray-300 py-1 px-2 rounded-lg"
                onClick={handleUnassign}
              >
                X
              </button>
            </div>
          ) : (
            "Assign..."
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search name..." />
          <CommandList>
            <CommandGroup>
              {admins.length > 0 ? (
                admins.map((admin: any) => (
                 <CommandItem
                      key={admin.id}
                      value={admin.username}
                      onSelect={() => handleSelect(admin)}
                      className={cn(
                        "cursor-pointer font-semibold capitalize",
                        assignedAdminNames.includes(admin.username)
                          ? "pointer-events-none opacity-50 text-gray-400"
                          : "text-gray-700"
                      )}
                      aria-disabled={assignedAdminNames.includes(admin.username)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedAdmin?.username === admin.username ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {admin.username}
                    </CommandItem>
                ))
              ) : (
                <CommandEmpty>No admins found.</CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AdminAssignee;