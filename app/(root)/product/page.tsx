'use client'
import {useSearchParams} from "next/navigation";
import useProducts from "@/hooks/useProducts";
import ProductRow from "@/components/ProductRow";


const ProductPage = () => {
    const params = useSearchParams()
    const { data, isLoading, error } = useProducts(params)

    console.log(data)
    return <main>
        <ProductRow isRow={false} hits={data?.hits} />
    </main>
}

export default ProductPage;