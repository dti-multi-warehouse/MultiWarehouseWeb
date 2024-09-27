import {FC} from "react";
import {clsx} from "clsx";
import ProductCardSkeleton from "@/components/ProductCard/ProductCardSkeleton";


const ProductRowSkeleton: FC = () => {
    const array = Array.from({ length: 20 }, (_, i) => i)

    return (
        <div className={'col-span-4 overflow-visible'}>
            <div
                className={clsx('grid grid-cols-2 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-visible no-scrollbar')}>
                {array.map( i => <ProductCardSkeleton key={i} />)}
            </div>
        </div>
    )
}

export default ProductRowSkeleton