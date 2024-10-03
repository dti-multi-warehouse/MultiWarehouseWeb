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
import React from "react";

const AdminAssignee: React.FC<{ onSelectAdmin: (admin: any) => void }> = ({ onSelectAdmin }) => {
  const [open, setOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);

  const { data: admins, isLoading } = useGetWarehouseAdmins();
  const handleSelect = (admin: any) => {
    setSelectedAdmin(admin);
    onSelectAdmin(admin);
    setOpen(false);
  };

  console.log("admins ",admins)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedAdmin
              ? selectedAdmin.name
              : "Assign an admin..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search name..." />
            <CommandList>
              <CommandGroup>
                {!isLoading && admins?.data?.length > 0 ? (
                  admins.data.map((admin: any) => (
                    <CommandItem
                      key={admin.id}
                      value={admin.name}
                      onSelect={() => handleSelect(admin)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedAdmin?.id === admin.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {admin.name}
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>Loading admins...</CommandEmpty>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AdminAssignee;