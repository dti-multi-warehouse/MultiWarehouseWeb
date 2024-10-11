import {useQuery} from "react-query";
import {getStockDetails} from "@/api/stock/getStockDetails";


const useStockDetails = (warehouseId: number, productId: number, date: Date) => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['stock-details', warehouseId, productId, date],
        queryFn: async () => getStockDetails(warehouseId, productId, date),
    })

    return { data, isLoading, error }
}

export default useStockDetails;