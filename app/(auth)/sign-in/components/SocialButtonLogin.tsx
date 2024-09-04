"use client";

import React from "react";
import { useSignIn } from "@clerk/nextjs";
import { FaGoogle } from "react-icons/fa";

const SocialButtonLogin: React.FC = () => {
  const { signIn, isLoaded } = useSignIn();

  const handleSocialSignIn = async (provider: "oauth_google") => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("Error during social sign-in:", err);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        className="bg-white border rounded-full shadow hover:shadow-lg flex items-center justify-center gap-3 py-1 px-3"
        onClick={() => handleSocialSignIn("oauth_google")}
      >
        <FaGoogle className="text-red-600" size={24} /> Sign In With Google
      </button>
    </div>
  );
};

export default SocialButtonLogin;
