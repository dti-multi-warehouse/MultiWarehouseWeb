"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import Buttons from "@/components/Buttons";
  import { profileInf } from "@/data/data";
  import { RiEdit2Fill } from "react-icons/ri";
  import { useState } from "react";
  import AddAddress from "../AddAddress";
import { FaLocationDot } from "react-icons/fa6";
  
  const AddressSaved: React.FC = () => {
    const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  
    return (
      <>
        <Dialog>
          <DialogTrigger className="flex items-center gap-2 bg-white text-red-400 px-2 rounded-xl font-semibold">
              <FaLocationDot /> Your Location
          </DialogTrigger>
          <DialogContent className="address-box max-h-[80vh] !p-0 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="pt-5 text-center">Alamat Tersimpan</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-5">
              <hr className="border-dashed border-gray-800" />
              <div className="flex flex-col gap-5 w-full p-5">
                {profileInf?.address?.map((address, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="font-semibold">{address.label}</p>
                      <button className="bg-red-200 text-red-600 rounded-full p-2">
                        <RiEdit2Fill />
                      </button>
                    </div>
                    <div className="flex gap-3 font-medium">
                      <p>{address.name}</p> - <p>{address.phone}</p>
                    </div>
                    <div>
                      <p>{address.address}</p>
                      <p>{address.country}</p>
                    </div>
                    <p
                      className={`${
                        address.isMainAddress ? "block" : "hidden"
                      } font-bold text-sm text-gray-600`}
                    >
                      Alamat Utama
                    </p>
                    <div
                      className={`h-2 w-full bg-gray-200 rounded-lg mt-5 ${
                        index === 2 ? "hidden" : "block"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
              <hr className="border-dashed border-gray-800" />
              <div className="flex items-center gap-5 pb-5 justify-center">
                <Buttons onClick={() => setIsAddAddressOpen(true)}>
                  Tambah Alamat
                </Buttons>
              </div>
            </div>
          </DialogContent>
        </Dialog>
  
        {isAddAddressOpen && (
          <AddAddress
            onClose={() => setIsAddAddressOpen(false)}
          />
        )}
      </>
    );
  };
  
  export default AddressSaved;
  