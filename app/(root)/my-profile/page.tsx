"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileInformation from "./components/ProfileInformatio";
import { useEffect } from "react";

const MyProfile: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="m-10 flex flex-col gap-10">
        <h2 className="font-bold text-xl">Profile User</h2>
        <div className="border-2 border-gray-200 rounded-xl flex flex-col">
          <div className="p-10 ">
            <p className="border border-red-600 rounded-full py-1 px-5 w-fit text-red-600">
              Pengaturan akun
            </p>
          </div>
          <hr className="border-dashed border-gray-600" />
          <div className="p-10">
            <ProfileInformation />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
