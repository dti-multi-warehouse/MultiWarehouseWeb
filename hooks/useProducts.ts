import {useQuery} from "react-query";
import {getProducts} from "@/api/getProducts";
import {ReadonlyURLSearchParams} from "next/navigation";


const useProducts = ( params: ReadonlyURLSearchParams) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['products', params.toString()],
        queryFn: async () => getProducts(params),
    })

    return { data, isLoading, error }
}

export default useProducts;