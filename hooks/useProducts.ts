import {useQuery} from "react-query";
import {getProducts} from "@/api/getProducts";
import {ReadonlyURLSearchParams} from "next/navigation";
import {ProductSearchResult} from "@/types/product";


const useProducts = ( params: ReadonlyURLSearchParams) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['products'],
        queryFn: async () => getProducts(params),
    })

    return { data, isLoading, error }
}

export default useProducts;