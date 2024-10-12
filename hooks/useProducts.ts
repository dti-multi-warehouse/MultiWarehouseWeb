import {useQuery} from "react-query";
import {getProducts} from "@/api/product/getProducts";
import {ReadonlyURLSearchParams} from "next/navigation";
import {getProductDetails} from "@/api/product/getProductDetails";
import {getFeaturedProducts} from "@/api/product/getFeaturedProducts";
import {getDashboardProducts} from "@/api/product/getDashboardProducts";


export const useProducts = ( params: ReadonlyURLSearchParams) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', params.toString()],
        queryFn: async () => getProducts(params),
    })

    return { data, isLoading, error }
}

export const useProductDetails = (id: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => getProductDetails(id),
    })

    return { data, isLoading, error }
}

export const useFeaturedProducts = () => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', 'featured'],
        queryFn: async () => getFeaturedProducts(),
    })

    return { data, isLoading, error }
}

export const useDashboardProducts = (query: string, page: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', 'dashboard', query, page],
        queryFn: async () => getDashboardProducts(query, page),
    })

    return { data, isLoading, error }
}