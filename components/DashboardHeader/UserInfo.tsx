import {FC} from "react";
import * as Avatar from "@radix-ui/react-avatar";
import {CircleChevronDown} from "lucide-react";

const UserInfo: FC = () => {
    return (
        <div className={"flex gap-2 items-center"}>
            <Avatar.Root className={"w-12 h-12 inline-flex border border-white rounded-full bg-red-500 text-white font-semibold"}>
                <Avatar.AvatarFallback className={"w-full h-full flex items-center justify-center"}>R</Avatar.AvatarFallback>
            </Avatar.Root>
            <div className={"flex flex-col"}>
                <p className={"font-medium"}>Reiss</p>
                <p className={"text-sm font-light"}>Admin</p>
            </div>
            <CircleChevronDown className={"text-gray-400"} />
        </div>
    )
}

export default UserInfo;