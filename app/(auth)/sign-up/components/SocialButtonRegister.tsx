"use client";

import React, { useEffect, useState } from "react";
import { useSignUp, useUser, useClerk } from "@clerk/nextjs";
import { FaGoogle } from "react-icons/fa";

const SocialButtonRegister: React.FC = () => {
  const { signUp, isLoaded } = useSignUp();
  
  const handleSocialSignUp = async (strategy: 'oauth_google') => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: `/after-sign-up`,
        redirectUrlComplete: `/after-sign-up`,
      });
    } catch (err) {
      console.error("Error during social sign-up:", err);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        className="bg-white border rounded-full shadow hover:shadow-lg flex gap-3 items-center justify-center py-1 px-3"
        onClick={() => handleSocialSignUp("oauth_google")}
      >
        <FaGoogle className="text-red-600" size={24} /> Sign Up With Google
      </button>
    </div>
  );
};

export default SocialButtonRegister;
