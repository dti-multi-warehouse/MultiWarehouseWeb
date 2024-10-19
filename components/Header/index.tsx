"use client";

import { useState } from "react";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { links } from "@/data/data";
import { ResponsiveHeader } from "../ResponsiveHeader";
import { useSession, signOut } from "next-auth/react";
import { useUser as useClerkUser } from "@clerk/nextjs";
import AlertDialog from "../AlertDialog";
import CartHeader from "./CartHeader";
import { TiArrowSortedDown } from "react-icons/ti";
import Image from "next/image";
import { useGetProfile } from "@/hooks/useUser";
import AddressSaved from "../Address/AddressSaved";
import {useRouter} from "next/navigation";
import React from "react";

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<Boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { data: session } = useSession();
  const { isSignedIn: isClerkSignedIn } = useClerkUser();
  const { profile, isLoading: isProfileLoading } = useGetProfile();
  const router = useRouter();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isLoggedIn = session || isClerkSignedIn;

  return (
    <>
    <div className="w-full h-full py-2 px-5 md:px-10 bg-gray-100">
      <AddressSaved />
    </div>
      <div className="flex items-center justify-between py-5 px-5 md:px-10 shadow-airbnbSoft overflow-x-hidden">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-red-500 font-semibold">
            AlphaMarch
          </Link>
          <div className="md:flex items-center gap-5 hidden">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-sm font-medium text-gray-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-10">
          <div className="relative flex items-center">
            <button
              onClick={toggleSearch}
              className={`focus:outline-none transition-all duration-300 ease-in-out transform ${
                isSearchOpen
                  ? "translate-x-[20%] opacity-100"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <BiSearch size={20} className="text-gray-500" />
            </button>
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push("/product?query=" + searchValue)
                }
              }}
              onChange={(e) => {setSearchValue(e.target.value);}}
              className={`absolute w-[190px] sm:w-[200px] md:w-[350px] left-full ml-2 border rounded-md px-2 py-1 transition-all duration-300 ease-in-out transform ${
                isSearchOpen
                  ? "translate-x-[-115%] opacity-100"
                  : "translate-x-0 opacity-0"
              }`}
              style={{
                visibility: isSearchOpen ? "visible" : "hidden",
              }}
            />
          </div>
          <CartHeader />
          <p className="font-semibold text-gray-300 text-3xl">|</p>

          {isLoggedIn && !isProfileLoading ? (
            <div className="">
              <button
                className="flex items-center gap-2"
                onClick={toggleDropdown}
              >
                <Image
                  src={profile?.avatar || "/default-user.png"}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full bg-gray-300"
                />
                <span>
                  <TiArrowSortedDown />
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <Link href="/my-profile">
                    <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer">
                      Profile
                    </div>
                  </Link>
                  <Link href="/waiting-payment">
                    <div className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer">
                      Status Transaksi
                    </div>
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="md:flex items-center gap-2 hidden">
              <Link href="/sign-in" className="hover:text-red-500">
                Login
              </Link>{" "}
              /{" "}
              <Link href="/sign-up" className="hover:text-red-500">
                Register
              </Link>
            </div>
          )}
          <ResponsiveHeader />
        </div>
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

export default Header;