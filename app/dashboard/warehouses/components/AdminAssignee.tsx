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
import { useToast } from "@/hooks/use-toast";
import { useAssignWarehouseAdmin } from "@/hooks/useWarehouse";
import { ToastAction } from "@/components/ui/toast";

const AdminAssignee: React.FC<{ warehouseId: number; assignedAdminName: string | null }> = ({ warehouseId, assignedAdminName }) => {
  const [open, setOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const { toast } = useToast();

  const { data: admins = [], isLoading, error } = useGetWarehouseAdmins(); 
  const assignAdminMutation = useAssignWarehouseAdmin();

  // Get all assigned admin usernames
  const assignedAdminNames = admins
    .filter((admin: any) => admin.warehouseId !== null) // Admins with a warehouseId are assigned
    .map((admin: any) => admin.username);

  useEffect(() => {
    if (assignedAdminName) {
      const initialAdmin = admins.find((admin: any) => admin.username === assignedAdminName);
      if (initialAdmin) {
        setSelectedAdmin(initialAdmin);
      }
    }
  }, [assignedAdminName, admins]);

  const handleSelect = (admin: any) => {
    if (assignedAdminNames.includes(admin.username)) {
      return;
    }

    setSelectedAdmin(admin);
    assignAdminMutation.mutate(
      { warehouseId, userId: admin.id },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: `${admin.username} has been assigned as warehouse admin.`,
            action: <ToastAction altText="Undo">Undo</ToastAction>,
          });
          setOpen(false);
          window.location.reload();
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to assign admin.",
            variant: "destructive",
          });
          console.error("Error assigning admin: ", error);
        },
      }
    );
  };

  if (isLoading) {
    return <div>Loading admins...</div>;
  }

  if (error) {
    return <div>Failed to load admins. Please try again.</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between capitalize"
        >
          {selectedAdmin ? selectedAdmin.username : "Assign an admin..."}
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
                      assignedAdminNames.includes(admin.username) ? "pointer-events-none opacity-50 text-gray-400" : "text-gray-700"
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
