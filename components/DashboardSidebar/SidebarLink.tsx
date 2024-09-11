'use client'

import {FC} from "react";
import Link from "next/link";
import {SidebarLinkProps} from "@/components/DashboardSidebar/types";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";

const SidebarLink: FC<SidebarLinkProps> = ({icon, text, link}) => {
    const fullPathname = usePathname()
    const pathSegments = fullPathname.split("/")
    const pathname = pathSegments[2] || ""

    return (
        <Link
            href={`/dashboard/${link}`}
            className={clsx("flex self-center gap-4 p-4 w-48 rounded-2xl", pathname === link && "bg-red-500 text-white")}>
            {icon}
            <p className={"capitalize"}>{text}</p>
        </Link>
    )
}

export default SidebarLink;