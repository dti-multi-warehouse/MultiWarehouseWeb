import {useQuery} from "react-query";
import {getProductAndStockAvailability} from "@/api/stock/getProductAndStockAvailability";


const useProductAndStockAvailability = (warehouseId: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product-stock-availability', warehouseId],
        queryFn: async () => getProductAndStockAvailability(warehouseId),
    })

    return { data, isLoading, error }
}

export default useProductAndStockAvailability;