"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useGetUserAddresses } from "@/hooks/useAddress";
import { RiFocus2Fill } from "react-icons/ri";

interface BuyerDetailProps {
  selectedAddressId: number | null;
  onAddressSelect: (addressId: number) => void;
}

const BuyerDetail: React.FC<BuyerDetailProps> = ({
  selectedAddressId,
  onAddressSelect,
}) => {
  const { addresses, isLoading: isAddressLoading } = useGetUserAddresses();

  const selectedAddress = addresses?.find(
    (address) => address.id === selectedAddressId
  );

  if (isAddressLoading) {
    return <div>Loading addresses...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger className="shadow-sketchSoft shadow-gray-100 text-left p-3 md:p-5 border-2 bg-gray-100 border-gray-400 rounded-xl flex gap-2">
        <RiFocus2Fill className="text-gray-600 mt-1" />
      {selectedAddress ? (
          <div className="">
            <div className="flex items-center gap-2">
                <strong>{selectedAddress.name} </strong>  
                - <p className="text-sm font-medium "> {selectedAddress.phoneNumber}</p> 
            </div>
            <p className="text-sm text-gray-500">{selectedAddress.address.street}, {selectedAddress.address.city} <br />
            {selectedAddress.address.province}</p>
          </div>
        ) : (
          `Select Address`
        )}
      </DialogTrigger>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Shipping Address</DialogTitle>
          <DialogDescription>
            Choose an address for your order delivery.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 py-3">
          <RadioGroup
            value={selectedAddressId?.toString()}
            onValueChange={(value) => onAddressSelect(parseInt(value))}
            className="flex flex-col gap-3"
          >
            {addresses?.map((address) => (
              <div key={address.id} className="flex gap-3 w-full border-2 bg-gray-100 border-gray-400 rounded-xl p-3">
                <RadioGroupItem
                  value={address.id.toString()}
                  id={`address-${address.id}`}
                />
                <Label
                  htmlFor={`address-${address.id}`}
                  className="leading-[1.6] text-gray-600"
                >
                  <strong className="text-black text-base">{address.name}</strong> - {address.phoneNumber} <br />
                  <span className="text-sm font-medium">{address.address.street}, <br /> {address.address.city}</span> 
                </Label>
              </div>
            ))}
          </RadioGroup>
          {!addresses?.length && <p>No address available. Please add one.</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyerDetail;
