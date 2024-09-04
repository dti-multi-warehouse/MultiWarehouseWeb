import {ReactNode} from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardMobileHeader from "@/components/DashboardMobileHeader";

const DashboardLayout = ({
        children
    }: Readonly<{
        children: ReactNode
    }>) => {
    return <main className={"flex h-screen w-screen"}>
        <DashboardSidebar />
        <div className={"h-screen w-full"}>
            <DashboardMobileHeader />
            <DashboardHeader />
            {children}
        </div>
    </main>
}

export default DashboardLayout