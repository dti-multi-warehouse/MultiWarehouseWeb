import {SidebarLinkProps} from "@/components/DashboardSidebar/types";
import {Building, ChartNoAxesCombined, Library, Mail, Package2, Tag, Truck, UsersRound, Warehouse} from "lucide-react";

export const sidebarLinks: SidebarLinkProps[] = [
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

export const superAdminLinks: SidebarLinkProps[] = [
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
        icon: <Tag />,
        text: "Categories",
        link: "categories"
    },
    {
        icon: <UsersRound />,
        text: "Users",
        link: "users"
    }
]