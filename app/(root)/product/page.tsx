'use client'
import {useSearchParams} from "next/navigation";
import useProducts from "@/hooks/useProducts";
import ProductRow from "@/components/ProductRow";
import ProductPagination from "@/app/(root)/product/components/ProductPagination";
import {Loader} from "lucide-react";
import ProductFilter from "@/app/(root)/product/components/ProductFilter";


const ProductPage = () => {
    const params = useSearchParams()
    const { data, isLoading, error } = useProducts(params)

    if (isLoading || !data) {
        return <Loader />
    }

    return <main className={""}>
        <div className={"grid grid-cols-5 gap-4"}>
            <ProductFilter />
            <ProductRow isRow={false} hits={data.hits} />
        </div>
        <ProductPagination currentPage={data.page} totalPages={data.totalPage} params={params}/>
    </main>
}

export default ProductPage;