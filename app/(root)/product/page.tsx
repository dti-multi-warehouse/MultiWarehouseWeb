'use client'
import {useSearchParams} from "next/navigation";
import useProducts from "@/hooks/useProducts";
import ProductRow from "@/components/ProductRow";
import ProductPagination from "@/app/(root)/product/components/ProductPagination";
import {Loader} from "lucide-react";


const ProductPage = () => {
    const params = useSearchParams()
    const { data, isLoading, error } = useProducts(params)

    if (isLoading || !data) {
        return <Loader />
    }

    return <main>
        <ProductRow isRow={false} hits={data?.hits} />
        <ProductPagination currentPage={data.page} totalPages={data.totalPage} params={params}/>
    </main>
}

export default ProductPage;