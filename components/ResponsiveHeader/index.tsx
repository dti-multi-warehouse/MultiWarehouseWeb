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

const ResponsiveHeader: React.FC = () => {
    return (
      <>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-gray-500 text-2xl"><HiMenuAlt3 /></button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-red-500 font-semibold">AlphaMarch</SheetTitle>
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
                  <Link href="/sign-in" className="text-blue-500">
                    Login
                  </Link>{" "}
                  /{" "}
                  <Link href="/sign-up" className="text-blue-500">
                    Register
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </>
    );
  };
  
  export { ResponsiveHeader };