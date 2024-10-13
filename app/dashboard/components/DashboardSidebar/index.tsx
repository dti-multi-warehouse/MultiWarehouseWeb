'use client'
import {FC} from "react";
import Link from "next/link";
import SidebarLink from "@/app/dashboard/components/DashboardSidebar/SidebarLink";
import {sidebarLinks, superAdminLinks} from "@/constants/sidebarLinks";
import useDashboardStore from "@/stores/useDashboardStore";

const DashboardSidebar: FC = () => {
    const isAdmin = useDashboardStore(state => state.isAdmin)
    return (
        <section className={"sticky top-0 left-0 h-screen w-[240px] flex flex-col max-md:hidden"}>
            <Link href={"/"} className={"text-red-500 font-semibold text-center pt-6 pb-8"}>
                AlphaMarch
            </Link>
            <nav className={"flex flex-col"}>
                {(isAdmin ? sidebarLinks.concat(superAdminLinks) : sidebarLinks)
                    .map(link => <SidebarLink key={link.link} {...link} />)
                }
            </nav>
        </section>
    )
}

export default DashboardSidebar