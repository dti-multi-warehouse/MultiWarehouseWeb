"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { useGetProfile, useResendVerificationEmail } from "@/hooks/useUser";
import EditProfileDialog from "./EditProfileDialog";
import { useGetUserAddresses } from "@/hooks/useAddress";
import React from "react";

const ProfileInformation: React.FC = () => {
  const { profile, isLoading: profileLoading, error: profileError } = useGetProfile();
  const { addresses = [], isLoading: addressesLoading, error: addressesError } = useGetUserAddresses();
  const [showResendButton, setShowResendButton] = useState(false);
  const resendVerificationEmail = useResendVerificationEmail();

  const handleResendVerification = async () => {
    if (profile && profile.email) {
      try {
        await resendVerificationEmail.mutateAsync({ email: profile.email });
        alert("Verification email has been resent.");
      } catch (error: any) {
        console.error("Failed to resend verification email", error);
        if (error.response) {
          console.error("Backend error response:", error.response.data);
          alert("Failed to resend verification email: " + error.response.data.message);
        } else {
          alert("An unexpected error occurred while resending the verification email.");
        }
      }
    }
  };

  useEffect(() => {
    if (profile && !profile.verified) {
      setShowResendButton(true);
    }
  }, [profile]);

  if (profileLoading) {
    return <p>Loading profile...</p>;
  }

  if (profileError) {
    return <p>Error loading profile</p>;
  }

  if (addressesLoading) {
    return <p>Loading addresses...</p>;
  }

  if (addressesError) {
    return <p>Error loading addresses</p>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
        <div className="flex flex-col items-center gap-5">
          <Image
            src={profile?.avatar || "/default-user.png"}
            alt="Profile picture"
            height={200}
            width={200}
            className="bg-gray-400 rounded-full"
          />
          <EditProfileDialog />
        </div>

        <div className="flex flex-col gap-5 w-full">
          <h3 className="text-lg font-bold">User Data</h3>
          <div>
            <p className="text-sm font-medium text-gray-600">Name</p>
            <p className="font-semibold">{profile?.username || (profile?.email.split("@")[0])}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Email</p>
            <div className="flex items-center gap-5 md:gap-10">
              <p className="font-semibold">{profile?.email}</p>
              {profile?.verified ? (
                <span className="flex items-center text-xs text-green-800 gap-1 bg-green-200 py-1 px-3 rounded-xl">
                  <MdVerified /> Verified
                </span>
              ) : (
                <button
                  className="flex items-center text-xs text-red-600 gap-1 bg-red-200 py-1 px-3 rounded-xl cursor-pointer"
                  onClick={handleResendVerification}
                >
                  <GoUnverified /> Not Verified - Resend Email
                </button>
              )}
            </div>
          </div>

          <h3 className="font-bold text-lg">Alamat User</h3>
          <div className="flex flex-col gap-5 w-full">
            {addresses.length > 0 ? (
                addresses.map((address, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p className="font-semibold">{address.label}</p>
                  </div>
                  <div className="flex gap-3 font-medium">
                    <p>{address.name}</p> - <p>{address.phoneNumber}</p>
                  </div>
                  <div>
                    <p>{address.address.street}, {address.address.city}, {address.address.province}</p>
                  </div>
                  <p
                    className={`${
                      address.primary === true ? "block" : "hidden"
                    } font-bold text-sm text-gray-600`}
                  >
                    Alamat Utama
                  </p>
                  <div
                    className={`h-2 w-full bg-gray-200 rounded-lg mt-5 ${
                      index === addresses.length - 1 ? "hidden" : "block"
                    }`}
                  ></div>
                </div>
              ))
            ) : (
              <p>No addresses saved yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;