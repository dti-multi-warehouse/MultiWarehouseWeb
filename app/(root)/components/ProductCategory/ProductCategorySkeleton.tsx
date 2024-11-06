import ProductCardSkeleton from "@/components/ProductCard/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { clsx } from "clsx";

const ProductCategorySkeleton: React.FC = () => {
    const array = Array.from({ length: 6 }, (_, i) => i)

    return(
        <div className="flex flex-col gap-5 p-5 md:p-10">
            <Skeleton className="w-32 h-10" />
            <div
                className={clsx('grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 overflow-hidden no-scrollbar gap-5')}>
                {array.map( i => <ProductCardSkeleton key={i} />)}
            </div>
        </div>
    )
}

export default ProductCategorySkeleton;