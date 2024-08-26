import {FC} from "react";
import ProductCard from "@/components/ProductCard";
import {clsx} from "clsx";
import {hit, ProductSummary} from "@/types/product";

interface ProductRowProps {
    isRow: boolean
    hits : hit[] | undefined
}


const ProductRow: FC<ProductRowProps> = ({isRow, hits}) => {

    return (
        <div className={'mx-1 sm:mx-3 md:mx-6 lg:mx-9'}>
            <h2 className={"font-bold text-2xl my-8"}>Categories</h2>
            <div className={clsx('grid', isRow ? 'grid-flow-col' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5', 'lg:gap-5', 'overflow-auto', 'no-scrollbar')}>
                {hits?.map((hit, index) => <ProductCard key={index} product={hit.document} />)}
            </div>
        </div>
    )
}

export default ProductRow;