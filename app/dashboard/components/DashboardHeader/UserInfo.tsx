"use client";

import { FC, useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { CircleChevronDown } from "lucide-react";
import { useUser, useGetProfile } from "@/hooks/useUser";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";

const UserInfo: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { loggedIn, loading } = useUser();
  const { profile, isLoading: profileLoading } = useGetProfile();
  const router = useRouter();
  const queryClient = useQueryClient();

  if (loading || profileLoading) {
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    return (
      <button
        onClick={() => router.push('/dashboard/sign-in')}
        className="text-red-600"
      >
        Login
      </button>
    );
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    queryClient.clear();
    signOut({
      redirect: true,
      callbackUrl: "/dashboard/sign-in",
    });
  };

  return (
    <div className="relative pt-2">
      <div className="flex gap-2 items-center">
        <Avatar.Root className="w-12 h-12 inline-flex border border-white rounded-full bg-red-500 text-white font-semibold">
          <Avatar.AvatarFallback className="w-full h-full flex items-center justify-center">
            {profile?.username ? profile.username.charAt(0).toUpperCase() : "U"}
          </Avatar.AvatarFallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <p className="font-medium">{profile?.username || "User"}</p>
          <p className="text-sm font-light">{profile?.role || "User"}</p>
        </div>
        <button onClick={toggleDropdown}>
          <CircleChevronDown className="text-gray-400" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;