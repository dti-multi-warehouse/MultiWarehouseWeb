"use client";

import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { FaGoogle } from "react-icons/fa";
import AlertDialog from "@/components/AlertDialog";

const SocialButtonLogin: React.FC = () => {
  const { signIn, isLoaded } = useSignIn();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSocialSignIn = async (provider: "oauth_google") => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/after-sign-in",
        redirectUrlComplete: "/after-sign-in",
      });
    } catch (err) {
      console.error("Error during social sign-in:", err);
      setDialogMessage("Failed to log in with Google. Please try again later.");
      setDialogOpen(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="bg-white border rounded-full shadow hover:shadow-lg flex items-center justify-center gap-3 py-1 px-3"
          onClick={() => handleSocialSignIn("oauth_google")}
        >
          <FaGoogle className="text-red-600" size={24} /> Sign In With Google
        </button>
      </div>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMessage}
        onAction={handleDialogClose}
        cancelVisibility="hidden"
      />
    </>
  );
};

export default SocialButtonLogin;
