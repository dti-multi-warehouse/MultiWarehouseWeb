"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { useGetProfile, useResendVerificationEmail } from "@/hooks/useUser";
import EditProfileDialog from "./EditProfileDialog";
import { profileInf } from "@/data/data";
import { RiEdit2Fill } from "react-icons/ri";

const ProfileInformation: React.FC = () => {
  const { profile, isLoading, error } = useGetProfile();
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading profile</p>;
  }

  return (
    <>
      <div className="flex gap-10 w-full">
        <div className="flex flex-col items-center gap-5">
          <Image
            src={profile?.avatar || "/default-avatar.jpg"}
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
            <p className="font-semibold">{profile?.username || "your name"}</p>
          </div>

          <div>

            <p className="text-sm font-medium text-gray-600">Email</p>
            <div className="flex items-center gap-10">
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
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
