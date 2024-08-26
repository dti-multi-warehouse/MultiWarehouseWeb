"use client";

import React, { useEffect, useState } from "react";
import { useSignUp, useUser, useClerk } from "@clerk/nextjs";
import { FaGoogle } from "react-icons/fa";
import { saveEmailToBackend } from '@/hooks/useUser';

const SocialButtonRegister: React.FC = () => {
  const { signUp, isLoaded } = useSignUp();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { client } = useClerk();
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (isUserLoaded && user && !emailSent) {
      const email = user.primaryEmailAddress?.emailAddress;

      if (email) {
        saveEmailToBackend(email)
          .then(() => {
            console.log('Email successfully saved to the backend.');
            setEmailSent(true);
          })
          .catch((error) => {
            console.error('Failed to save email to backend:', error);
          });
      }
    }
  }, [isUserLoaded, user, emailSent]);

  const handleSocialSignUp = async (strategy: 'oauth_google') => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: `${window.location.origin}/after-sign-up`,
        redirectUrlComplete: `${window.location.origin}/after-sign-up`,
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
