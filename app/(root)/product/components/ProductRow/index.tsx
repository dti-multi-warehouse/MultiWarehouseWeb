import {FC} from "react";
import {clsx} from "clsx";
import {hit} from "@/types/product";
import ProductCard from "@/components/ProductCard";

interface ProductRowProps {
    isRow: boolean
    hits : hit[] | undefined
}


const ProductRow: FC<ProductRowProps> = ({isRow, hits}) => {

    return (
        <div className={'col-span-4 overflow-visible'}>
            <div className={clsx('grid', isRow ? 'grid-flow-col' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5', 'overflow-visible', 'no-scrollbar')}>
                {hits?.map((hit, index) => <ProductCard key={index} {...hit.document} />)}
            </div>
        </div>
    )
}

export default ProductRow;