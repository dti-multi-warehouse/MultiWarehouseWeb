import {useQuery} from "react-query";
import {getWarehouseAndStockAvailability} from "@/api/getWarehouseAndStockAvailability";


const useWarehouseAndStockAvailability = (warehouseId: number, productId: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['warehouse-stock-availability', warehouseId, productId],
        queryFn: async () => getWarehouseAndStockAvailability(warehouseId, productId),
    })

    return { data, isLoading, error }
}

export default useWarehouseAndStockAvailability;