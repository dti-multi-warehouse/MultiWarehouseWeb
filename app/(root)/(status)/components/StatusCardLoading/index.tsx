import { Skeleton } from "@/components/ui/skeleton"

const StatusCardLoading: React.FC = () => {
    return(
        <div className="w-full flex flex-col gap-5 md:flex-row p-3 justify-between items-center border-2 border-gray-300 rounded-xl">
            <div className="flex justify-between md:justify-start w-full md:gap-5 items-center">
                <Skeleton className="w-[120px] h-[120px]" />
                <div className="flex flex-col gap-3">
                    <Skeleton className="w-20 h-5" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-32 h-5" />
                        <Skeleton className="w-28 h-5" />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-start md:items-end gap-2">
                <Skeleton className="w-32 h-5" />
                <Skeleton className="w-36 h-5" />
                <Skeleton className="w-28 h-5" />
                <Skeleton className="w-40 h-10" />
            </div>
        </div>
    )
}

export default StatusCardLoading;