"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import apiClient from "@/lib/apiClient";

const AfterSignIn: React.FC = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const syncSocialLogin = async (email: string, token: string) => {
    try {
      const response = await apiClient.post("/v1/auth/social-login", { email, token });
      
      localStorage.setItem("jwt", response.data.accessToken);

      await signIn("credentials", {
        redirect: false,
        token: response.data.accessToken,
        email: email,
        social: true,
        callbackUrl: "/", 
      });

      router.push("/");
    } catch (error) {
      console.error("Error syncing social login:", error);
      setError("Failed to sync social login.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      const email = user.primaryEmailAddress?.emailAddress;
      if (email) {
        getToken({ template: "social_login_jwt" })
          .then((token) => {
            if (token) {
              syncSocialLogin(email, token);
            } else {
              setError("Failed to retrieve Clerk token.");
            }
          })
          .catch((err) => setError("Error retrieving token: " + err));
      }
    }
  }, [isLoaded, user, getToken, syncSocialLogin]);

  return (
    <div>
      {loading ? <p>Signing you in...</p> : error ? <p>{error}</p> : <p>Sign-in successful! Redirecting...</p>}
    </div>
  );
};

export default AfterSignIn;
