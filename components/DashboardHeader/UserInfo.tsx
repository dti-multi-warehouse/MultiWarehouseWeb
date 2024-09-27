"use client";

import { FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { CircleChevronDown } from "lucide-react";
import { useUser, useGetProfile } from "@/hooks/useUser";
import { signIn } from "next-auth/react";
import Buttons from "@/components/Buttons";
import { useRouter } from "next/navigation";

const UserInfo: FC = () => {
  const { loggedIn, loading } = useUser();
  const { profile, isLoading: profileLoading } = useGetProfile();
  const router = useRouter();

  if (loading || profileLoading) {
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    return (
      <button
        onClick={ () => router.push('/dashboard/sign-in')}
        className="text-red-600"
      >
        Login
      </button>
    );
  }

  return (
    <div className={"flex gap-4 items-center"}>
      <Avatar.Root className={"w-12 h-12 inline-flex border border-white rounded-full bg-red-500 text-white font-semibold"}>
        <Avatar.AvatarFallback className={"w-full h-full flex items-center justify-center"}>
          {profile?.username ? profile.username.charAt(0).toUpperCase() : "U"}
        </Avatar.AvatarFallback>
      </Avatar.Root>
      <div className={"flex flex-col"}>
        <p className={"font-medium"}>{profile?.username || "User"}</p>
        <p className={"text-sm font-light"}>{profile?.role || "User"}</p>
      </div>
      <CircleChevronDown className={"text-gray-400"} />
    </div>
  );
};

export default UserInfo;
