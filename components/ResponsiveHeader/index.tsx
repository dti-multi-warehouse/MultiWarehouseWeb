"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { links } from "@/data/data";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { useUser as useClerkUser } from "@clerk/nextjs";
import AlertDialog from "../AlertDialog";

const ResponsiveHeader: React.FC = () => {
  const { data: session } = useSession(); // Get session data to check if user is authenticated
  const { isSignedIn: isClerkSignedIn } = useClerkUser();  // Check if signed in with Clerk
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLogout = () => {
    setDialogOpen(true);
  };

  const confirmLogout = () => {
    signOut({ redirect: false });
    if (isClerkSignedIn) {
      window.Clerk?.signOut();
    }
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
                  className="text-sm font-medium text-gray-500"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4">
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="text-blue-500">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/sign-in" className="text-blue-500">
                      Login
                    </Link>{" "}
                    /{" "}
                    <Link href="/sign-up" className="text-blue-500">
                      Register
                    </Link>
                  </>
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
