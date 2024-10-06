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
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetWarehouseAdmins } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/use-toast";
import { useAssignWarehouseAdmin } from "@/hooks/useWarehouse";
import { ToastAction } from "@/components/ui/toast";

const AdminAssignee: React.FC<{ warehouseId: number }> = ({ warehouseId }) => {
  const [open, setOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const { toast } = useToast();

  const { data: admins, isLoading, error } = useGetWarehouseAdmins();
  const assignAdminMutation = useAssignWarehouseAdmin();

  const handleSelect = (admin: any) => {
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
    setOpen(false);
  };

  // Handle loading state
  if (isLoading) {
    return <div>Loading admins...</div>;
  }

  // Handle error state
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
          className="w-full justify-between"
        >
          {selectedAdmin ? selectedAdmin.username : "Assign an admin..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search name..." />
          <CommandList>
            <CommandGroup>
              {admins?.length > 0 ? (
                admins.map((admin: any) => (
                  <CommandItem
                    key={admin.id}
                    value={admin.username} 
                    onSelect={() => handleSelect(admin)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedAdmin?.id === admin.id
                          ? "opacity-100"
                          : "opacity-0"
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