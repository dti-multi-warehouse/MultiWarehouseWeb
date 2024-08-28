import {ReactNode} from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

const DashboardLayout = ({
        children
    }: Readonly<{
        children: ReactNode
    }>) => {
    return <main className={"flex h-screen w-screen"}>
        <DashboardSidebar />
        <div className={"h-screen w-full"}>
            <DashboardHeader />
            {children}
        </div>
    </main>
}

export default DashboardLayout