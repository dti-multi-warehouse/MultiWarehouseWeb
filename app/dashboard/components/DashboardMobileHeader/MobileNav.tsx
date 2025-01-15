import {FC} from "react";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Menu} from "lucide-react";
import Link from "next/link";
import SidebarLink from "@/app/dashboard/components/DashboardSidebar/SidebarLink";
import {sidebarLinks, superAdminLinks} from "@/constants/sidebarLinks";
import UserInfo from "../DashboardHeader/UserInfo";
import useDashboardStore from "@/stores/useDashboardStore";

const MobileNav: FC = () => {
    const isAdmin = useDashboardStore(state => state.isAdmin)
    return (
        <Sheet>
            <SheetTrigger>
                <Menu />
            </SheetTrigger>
            <SheetContent side={"left"} className="w-fit">
                <SheetHeader>
                    <Link href={"/"} className={"text-red-500 font-semibold text-center py-4"}>
                        AlphaMarch
                    </Link>
                </SheetHeader>
                <nav>
                    {(isAdmin ? sidebarLinks.concat(superAdminLinks) : sidebarLinks)
                        .map(link => (
                            <SheetClose key={link.link} asChild>
                                <SidebarLink {...link} />
                            </SheetClose>
                        ))
                    }
                </nav>
                <UserInfo />
            </SheetContent>
        </Sheet>

    )
}

export default MobileNav