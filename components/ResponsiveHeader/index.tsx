"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links } from "@/data/data";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { useUser as useClerkUser } from "@clerk/nextjs";
import AlertDialog from "../AlertDialog";
import Image from "next/image";
import { TiArrowSortedDown } from "react-icons/ti";
import { useGetProfile } from "@/hooks/useUser";

const ResponsiveHeader: React.FC = () => {
  const { data: session } = useSession();
  const { isSignedIn: isClerkSignedIn } = useClerkUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { profile, isLoading: isProfileLoading } = useGetProfile();

  const handleLogout = () => {
    setDialogOpen(true);
  };

  const confirmLogout = () => {
    if (isClerkSignedIn) {
      window.Clerk?.signOut();
    }
    signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const isLoggedIn = session || isClerkSignedIn;

  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-gray-500 text-2xl">
              <HiMenuAlt3 />
            </button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-red-500 font-semibold">
                AlphaMarch
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="font-medium text-gray-500"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4">
                {isLoggedIn && !isProfileLoading ? (
                  <div className="">
                    
                  </div>
                ) : (
                  <div className="text-gray-700">
                    <Link href="/sign-in" className="hover:text-red-500">
                      Login
                    </Link>{" "}
                    /{" "}
                    <Link href="/sign-up" className="hover:text-red-500">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        title="Are you sure you want to logout?"
        description="You will be logged out of your session."
        actionLabel="Logout"
        cancelLabel="Cancel"
        onAction={confirmLogout}
      />
    </>
  );
};

export { ResponsiveHeader };
