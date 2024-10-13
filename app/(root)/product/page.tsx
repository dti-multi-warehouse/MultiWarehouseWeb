'use client'
import {useSearchParams} from "next/navigation";
import ProductPagination from "@/app/(root)/product/components/ProductPagination";
import ProductFilter from "@/app/(root)/product/components/ProductFilter";
import ProductRowSkeleton from "@/app/(root)/product/components/ProductRow/ProductRowSkeleton";
import ProductRow from "@/app/(root)/product/components/ProductRow";
import {useProducts} from "@/hooks/useProducts";


const ProductPage = () => {
    const params = useSearchParams()
    const { data, isLoading, error } = useProducts(params)

    return <main className={""}>
        <div className={"flex flex-col xl:grid xl:grid-cols-5 gap-4"}>
            <ProductFilter />
            {isLoading || !data ? <ProductRowSkeleton /> : <ProductRow isRow={false} hits={data.hits} />}
        </div>
        {data && <ProductPagination currentPage={data.page} totalPages={data.totalPage} params={params}/>}
    </main>
}

export default ProductPage;