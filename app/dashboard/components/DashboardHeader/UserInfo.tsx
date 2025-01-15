"use client";

import { FC, useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { CircleChevronDown } from "lucide-react";
import { useUser, useGetProfile } from "@/hooks/useUser";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const UserInfo: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { loggedIn, loading } = useUser();
  const { profile, isLoading: profileLoading } = useGetProfile();
  const router = useRouter();
  const queryClient = useQueryClient();

  if (loading || profileLoading) {
    return <Skeleton className="w-32 h-10 mt-2" />;
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
    <div className="relative pt-10 lg:pt-2">
      <div className="flex gap-10 lg:gap-2 items-center  lg:justify-start border border-gray-400 lg:border-none lg:p-0 p-3 rounded-xl w-fit">
        <div className="flex items-center gap-2">
          <Avatar.Root className="w-12 h-12 inline-flex border border-white rounded-full bg-red-500 text-white font-semibold">
            {profile?.avatar ? (
              <Image
                src={profile.avatar}
                alt={`${profile?.username || profile?.email.split("@")[0]}'s avatar`}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            ) : (
              <Avatar.AvatarFallback className="w-full h-full flex items-center justify-center">
                {profile?.username
                  ? profile.username.charAt(0).toUpperCase()
                  : profile?.email.charAt(0).toUpperCase()}
              </Avatar.AvatarFallback>
            )}
          </Avatar.Root>
          <div className="flex flex-col">
            <p className="font-medium">
              {profile?.username || profile?.email.split("@")[0]}
            </p>
            <p className="text-sm font-light">{profile?.role || "User"}</p>
          </div>
        </div>
        <button onClick={toggleDropdown}>
          <CircleChevronDown className="text-gray-400" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 max-lg:top-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
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
