"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { saveEmailToBackend } from '@/hooks/useUser';
import { useRouter } from "next/navigation";

const AfterSignUp: React.FC = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const email = user.primaryEmailAddress?.emailAddress;

      if (email) {
        saveEmailToBackend(email)
          .then(() => {
            console.log('Email successfully saved to the backend.');
            router.push("/"); 
          })
          .catch((error) => {
            console.error('Failed to save email to backend:', error);
          });
      }
    }
  }, [isLoaded, user, router]);

  return(
    <div className="my-5 flex justify-center">
      <div className="p-5 rounded-xl border-2 border-gray-300">
        <p className="text-xl font-semibold text-gray-500">Finishing up your registration...</p></div>
    </div>
  );
};

export default AfterSignUp;
