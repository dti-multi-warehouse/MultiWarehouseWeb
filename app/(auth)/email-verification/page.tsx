"use client";

import ReactQueryProvider from "@/lib/ReactQueryProvider";
import EmailVerificationForm from "./components/EmailVerificationForm";
import { useSearchParams } from "next/navigation";
import React from "react";

const EmailVerification: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  return (
    <>
      <div className="flex w-full justify-center items-center my-[60px]">
        <div className="flex flex-col items-center border border-gray-200 shadow-boxed shadow-gray-300 lg:min-w-[372px] max-w-[372px] p-5 gap-y-5 rounded-xl">
          <h2 className="font-semibold text-lg">Set Your Password</h2>
          <span className="text-sm text-gray-600">
            Thank you <strong>{email}</strong>, you have successfully confirm
            your email.
          </span>
          <div className="w-full">
            <EmailVerificationForm email={email || ""} token={token || ""} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
