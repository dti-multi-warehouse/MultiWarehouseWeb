import {useQuery} from "react-query";
import {getActiveStockMutationRequest} from "@/api/getActiveStockMutationRequest";


const useActiveStockMutationRequest = (warehouseId: number) => {
    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery( {
        queryKey: ['stock-mutation'],
        queryFn: async () => getActiveStockMutationRequest(warehouseId),
        staleTime: 60 * 1000
    })

    return { data, isLoading, error, refetch }
}

export default useActiveStockMutationRequest;