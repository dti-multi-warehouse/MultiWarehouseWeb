import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeleton: React.FC = () => {
    return(
        <div className="flex gap-5 items-center py-5 md:py-10">
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-32 h-10" />
        </div>
    )
}

export default CategorySkeleton;