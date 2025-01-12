"use client";

import React, { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs"; 
import { saveEmailToBackend } from '@/hooks/useUser';
import { useRouter } from "next/navigation";
import AlertDialog from "@/components/AlertDialog";
import { Skeleton } from "@/components/ui/skeleton";

const AfterSignUp: React.FC = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();  
  const router = useRouter();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleDialogClose = () => {
    setDialogOpen(false);
    router.push("/sign-in");
  };

  useEffect(() => {
    if (isLoaded && user) {
      const email = user.primaryEmailAddress?.emailAddress;

      if (email) {
        saveEmailToBackend(email)
          .then(() => {
            console.log('Email successfully saved to the backend.');
            setDialogMessage("Your registration is complete. Click OK to sign in.");
            setDialogOpen(true);
            signOut().then(() => {
              router.push("/sign-in");
            });
          })
          .catch((error) => {
            if (error.response?.status === 409) {
              console.error('Email is already registered as a regular user.');
              setDialogMessage("Email is already registered as a regular user. Please sign in.");
              setDialogOpen(true);
              signOut().then(() => {
                router.push("/sign-in");
              });
            } else {
              console.error('Failed to save email to backend:', error);
              setDialogMessage("Failed to save email. Please try again later.");
              setDialogOpen(true);
            }
          });
      }
    }
  }, [isLoaded, user, router, signOut]);

  return (
    <>
      <Skeleton className="flex w-full p-5 justify-center">
        <p className="text-xl font-semibold text-gray-800">Finishing up your registration...</p>
      </Skeleton>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMessage}
        onAction={handleDialogClose}
        cancelVisibility='hidden'
      />
    </>
  );
};

export default AfterSignUp;
