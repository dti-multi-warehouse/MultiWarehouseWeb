import {FC} from "react";
import Link from "next/link";
import MobileNav from "@/app/dashboard/components/DashboardMobileHeader/MobileNav";

const DashboardMobileHeader: FC = () => {
    return (
        <nav className={"md:hidden h-[70px] border-b flex justify-between items-center p-8"}>
            <Link href={"/"} className={"text-red-500 font-semibold text-center pt-6 pb-8"}>
                AlphaMarch
            </Link>
            <MobileNav />
        </nav>
    )
}

export default DashboardMobileHeader