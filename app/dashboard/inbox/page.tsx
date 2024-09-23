import {FC} from "react";
import ListSidebar from "./components/ListSidebar";
import MutationDetails from "@/app/dashboard/inbox/components/MutationDetails";

const InboxDashboardPage: FC = () => {
    // fetch mutation request

    return (
        <main className={"grid grid-cols-4 w-full h-full"}>
            <ListSidebar />
            <MutationDetails />
        </main>
    )
}

export default InboxDashboardPage