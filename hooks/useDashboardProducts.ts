import {useQuery} from "react-query";
import {getDashboardProducts} from "@/api/getDashboardProducts";


const useDashboardProducts = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', 'dashboard'],
        queryFn: async () => getDashboardProducts(),
    })

    return { data, isLoading, error }
}

export default useDashboardProducts;