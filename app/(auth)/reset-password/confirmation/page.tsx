"use client";

import ReactQueryProvider from "@/lib/ReactQueryProvider";
import ResetPasswordConfirmForm from "./components/ResetPasswordConfirm";
import { useSearchParams } from "next/navigation";

const ResetPasswordConfirmation: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  return (
    <>
      <div className="flex w-full justify-center items-center my-[60px]">
        <div className="flex flex-col items-center border border-gray-200 shadow-boxed shadow-gray-300 lg:min-w-[372px] max-w-[372px] p-5 gap-y-5 rounded-xl">
          <h2 className="font-semibold text-lg">Set New Password</h2>
          <span className="text-sm text-gray-600">
            Please set a new password for your account.
          </span>
          <div className="w-full">
            <ResetPasswordConfirmForm email={email || ""} token={token || ""} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordConfirmation;
