"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Buttons from "@/components/Buttons";
import { RiEdit2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import AddAddress from "../AddAddress";
import EditAddress from "../EditAddress";
import { FaLocationDot } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useGetUserAddresses, useDeleteUserAddress } from "@/hooks/useAddress";
import AlertDialog from "@/components/AlertDialog";
import React from "react";

const AddressSaved: React.FC = () => {
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const { data: session } = useSession();

  const { addresses = [], isLoading, error, refetch } = useGetUserAddresses();
  const { mutate: deleteAddress, isLoading: isDeleting } = useDeleteUserAddress();

  const handleClick = () => {
    if (!session?.user) {
      setIsAlertOpen(true);
      setIsDialogOpen(false);
    } else {
      setIsDialogOpen(true);
    }
  };

  useEffect(() => {
    if (!session?.user && isDialogOpen) {
      setIsDialogOpen(false);
      setIsAlertOpen(true);
    }
  }, [session, isDialogOpen]);

  const handleDeleteClick = (addressId: number) => {
    setAddressToDelete(addressId); 
    setIsConfirmDeleteOpen(true);  
  };

  const handleDeleteConfirm = () => {
    if (addressToDelete) {
      deleteAddress(addressToDelete, {
        onSuccess: () => {
          refetch(); 
          setAddressToDelete(null); 
          setIsConfirmDeleteOpen(false); 
        },
        onError: (err) => {
          console.error("Error deleting address:", err);
          setAddressToDelete(null);
        },
      });
    }
  };

  const handleEdit = (addressId: number) => {
    setSelectedAddressId(addressId); 
    setIsEditAddressOpen(true); 
  };

  if (isLoading) return <p className="loader"></p>;

  if (error) return <p>Error loading addresses</p>;

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="flex items-center text-sm gap-2 bg-white text-red-400 px-2 rounded-xl font-semibold"
            onClick={handleClick}
          >
            <FaLocationDot /> Set Your Location
          </button>
        </DialogTrigger>
        <DialogContent className="address-box max-h-[80vh] !p-0 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pt-5 text-center">Alamat Tersimpan</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <hr className="border-dashed border-gray-800" />
            <div className="flex flex-col gap-5 w-full p-5">
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <div key={index} className="flex flex-col gap-2 rounded-xl bg-gray-100 p-2 md:p-5">
                    <div className="flex justify-between">
                      <p className="font-semibold">{address.label}</p>
                      <div className="flex items-center gap-2">
                        <button
                          className="bg-red-200 text-red-600 rounded-full p-2"
                          onClick={() => handleEdit(address.id)} 
                        >
                          <RiEdit2Fill />
                        </button>
                        <button
                          className={`bg-red-200 text-red-600 rounded-full p-2 ${
                            isDeleting && selectedAddressId === address.id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => handleDeleteClick(address.id)}
                          disabled={isDeleting && selectedAddressId === address.id}
                        >
                          {isDeleting && selectedAddressId === address.id ? (
                            <span>Deleting...</span>
                          ) : (
                            <RiDeleteBin6Line />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-3 font-medium">
                      <p>{address.name}</p> - <p>{address.phoneNumber}</p>
                    </div>
                    <div>
                      <p>
                        {address.address.street}, {address.address.city},{" "}
                        {address.address.province}
                      </p>
                    </div>
                    <p
                      className={`${
                        address.primary === true ? "block" : "hidden"
                      } font-bold text-sm text-gray-600`}
                    >
                      Alamat Utama
                    </p>
                  </div>
                ))
              ) : (
                <p>No addresses saved yet.</p>
              )}
            </div>
            <hr className="border-dashed border-gray-800 last:border-transparent" />
            <div className="flex items-center gap-5 pb-5 justify-center">
              <Buttons onClick={() => setIsAddAddressOpen(true)}>
                Tambah Alamat
              </Buttons>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isAddAddressOpen && <AddAddress onClose={() => setIsAddAddressOpen(false)} />}
      {isEditAddressOpen && selectedAddressId && <EditAddress addressId={selectedAddressId} onClose={() => setIsEditAddressOpen(false)} />}

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={isConfirmDeleteOpen}
        onOpenChange={setIsConfirmDeleteOpen}
        title="Delete Address"
        description="Are you sure you want to delete this address? This action cannot be undone."
        actionLabel="Delete"
        onAction={handleDeleteConfirm}  
        cancelLabel="Cancel"
      />

      <AlertDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title="Login Required"
        description="You need to be logged in to view your saved addresses. Please log in to continue."
        actionLabel="Login"
        onAction={() => {
          setIsAlertOpen(false);
          window.location.href = "/sign-in";
        }}
        cancelLabel="Cancel"
      />
    </>
  );
};

export default AddressSaved;