import {FC} from "react";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Building, ChartNoAxesCombined, Library, Mail, Menu, Package2, Truck, UsersRound, Warehouse} from "lucide-react";
import Link from "next/link";
import {SidebarLinkProps} from "@/components/DashboardSidebar/types";
import SidebarLink from "@/components/DashboardSidebar/SidebarLink";

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

const MobileNav: FC = () => {
    const isSuper = true
    return (
        <Sheet>
            <SheetTrigger>
                <Menu />
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader>
                    <Link href={"/"} className={"text-red-500 font-semibold text-center py-4"}>
                        AlphaMarch
                    </Link>
                </SheetHeader>
                <nav>
                    {(isSuper ? sidebarLinks.concat(superAdminLinks) : sidebarLinks)
                        .map(link => (
                            <SheetClose key={link.link} asChild>
                                <SidebarLink {...link} />
                            </SheetClose>
                        ))
                    }
                </nav>
            </SheetContent>
        </Sheet>

    )
}

export default MobileNav