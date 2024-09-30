import {useQuery} from "react-query";
import {getStockDetails} from "@/api/getStockDetails";


const useStockDetails = (warehouseId: number, productId: number) => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['stock-details', warehouseId, productId],
        queryFn: async () => getStockDetails(warehouseId, productId),
    })

    return { data, isLoading, error }
}

export default useStockDetails;