import {FC} from "react";
import {Skeleton} from "@/components/ui/skeleton";


const ProductCardSkeleton:FC = () => {
    return (
        <div className="flex flex-col gap-2 min-w-[150px] h-[400px] border max-w-[200px] rounded-xl">
        {/*    Image Skeleton   */}
            <Skeleton className={"w-[200px] min-h-[200px]"} />
            <div className="flex flex-col gap-2 p-5 h-full justify-between">
                <div className={"space-y-2"}>
                    <Skeleton className={"w-36 h-4"} />
                    <Skeleton className={"w-36 h-8"} />
                </div>
                <Skeleton className={"w-36 h-12"}/>
            </div>
        </div>
    )
}

export default ProductCardSkeleton