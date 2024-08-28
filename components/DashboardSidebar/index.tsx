import {FC} from "react";
import Link from "next/link";
import {Building, ChartNoAxesCombined, Library, Mail, Package2, Truck, UsersRound, Warehouse} from "lucide-react";
import SidebarLink from "@/components/DashboardSidebar/SidebarLink";
import {SidebarLinkProps} from "@/components/DashboardSidebar/types";

const sidebarLinks: SidebarLinkProps[] = [
    {
        icon: <ChartNoAxesCombined />,
        text: "Dashboard",
        link: ""
    },
    {
        icon: <Mail />,
        text: "Inbox",
        link: "inbox"
    },
    {
        icon: <Truck />,
        text: "Orders",
        link: "orders"
    },
    {
        icon: <Package2 />,
        text: "Stocks",
        link: "stocks"
    }
]

const superAdminLinks: SidebarLinkProps[] = [
    {
        icon: <Building />,
        text: "Team",
        link: "team"
    },
    {
        icon: <Warehouse />,
        text: "Warehouses",
        link: "warehouses"
    },
    {
        icon: <Library />,
        text: "Products",
        link: "products"
    },
    {
        icon: <UsersRound />,
        text: "Users",
        link: "users"
    }
]

const DashboardSidebar: FC = () => {
    const isSuper = true
    return (
        <section className={"sticky top-0 left-0 h-screen w-[240px] flex flex-col border-r max-md:hidden"}>
            <Link href={"/"} className={"text-red-500 font-semibold text-center pt-6 pb-8"}>
                AlphaMarch
            </Link>
            <nav className={"flex flex-col"}>
                {(isSuper ? sidebarLinks.concat(superAdminLinks) : sidebarLinks)
                    .map(link => <SidebarLink key={link.link} {...link} />)
                }
            </nav>
        </section>
    )
}

export default DashboardSidebar