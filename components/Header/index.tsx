"use client";

import { useState } from "react";
import Link from "next/link";
import { BiUser, BiSearch } from "react-icons/bi";
import { links } from "@/data/data";
import { ResponsiveHeader } from "../ResponsiveHeader";

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<Boolean>(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 px-10 shadow-md shadow-gray-200 overflow-x-hidden">
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
        <div className="flex items-center gap-3">
        <div className="relative flex items-center">
            <button onClick={toggleSearch} className={`focus:outline-none transition-all duration-300 ease-in-out transform ${isSearchOpen ? "translate-x-[20%] opacity-100" : "translate-x-0 opacity-100"}`}>
              <BiSearch size={20} className="text-gray-500" />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className={`absolute left-full ml-2 border rounded-md px-2 py-1 transition-all duration-300 ease-in-out transform ${
                isSearchOpen ? "translate-x-[-115%] opacity-100" : "translate-x-0 opacity-0"
              }`}
              style={{
                visibility: isSearchOpen ? "visible" : "hidden",
              }}
            />
          </div>
          <p className="md:flex items-center gap-3 text-blue-500 hidden">
            <BiUser />
            <Link href="/sign-in">Login</Link> / <Link href="/sign-up">Register</Link>
          </p>
            <ResponsiveHeader />
        </div>
      </div>
      
    </>
  );
};

export default Header;