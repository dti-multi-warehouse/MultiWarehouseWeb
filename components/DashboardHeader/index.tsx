import {FC} from "react";
import UserInfo from "@/components/DashboardHeader/UserInfo";

const DashboardHeader: FC = () => {
    return (
        <section className={"flex justify-end h-[70px] pr-8 border-b max-md:hidden"}>
            <UserInfo/>
        </section>
    )
}

export default DashboardHeader;