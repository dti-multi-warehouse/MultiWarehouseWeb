import {FC} from "react";
import UserInfo from "@/app/dashboard/components/DashboardHeader/UserInfo";

const DashboardHeader: FC = () => {
    return (
        <section className={"flex justify-end h-[70px] pr-8 border-b max-lg:hidden"}>
            <UserInfo/>
        </section>
    )
}

export default DashboardHeader;