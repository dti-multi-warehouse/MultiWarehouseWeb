import {ReactNode} from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardMobileHeader from "@/components/DashboardMobileHeader";

const DashboardLayout = ({
        children
    }: Readonly<{
        children: ReactNode
    }>) => {
    return <main className={"flex"}>
        <DashboardSidebar />
        <div className={"h-full w-full border-l"}>
            <DashboardMobileHeader />
            <DashboardHeader />
            {children}
        </div>
    </main>
}

export default DashboardLayout