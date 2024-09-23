import {FC} from "react";
import MutationItem from "@/app/dashboard/inbox/components/ListSidebar/MutationItem";


const ListSidebar: FC = () => {
    return (
        <div className={"col-span-1 h-full border-r"}>
            <MutationItem />
            <MutationItem />
        </div>
    )
}

export default ListSidebar