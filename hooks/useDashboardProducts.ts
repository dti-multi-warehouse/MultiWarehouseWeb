import {useQuery} from "react-query";
import {getDashboardProducts} from "@/api/getDashboardProducts";


const useDashboardProducts = (query: string, page: number) => {
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

export default useDashboardProducts;