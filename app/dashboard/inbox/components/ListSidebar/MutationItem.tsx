import {FC} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


const MutationItem: FC = () => {
    return (
        <div
            className={"flex items-center gap-2 p-2 h-16 border-b hover:cursor-pointer"}>
            <Avatar>
                <AvatarImage src={"/product.png"} alt={"Photo of product"} />
                <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div className={"flex-1"}>
                <h3 className={"font-semibold text-sm"}>Chiki <span>x5</span></h3>
                <div className={"flex justify-between"}>
                    <p className={"text-xs"}>Requested by Warehouse 5</p>
                    <p className={"text-xs text-gray-500 self-end"}>2h</p>
                </div>
            </div>
        </div>
    )
}

export default MutationItem