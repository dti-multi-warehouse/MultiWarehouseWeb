import {useQuery} from "react-query";
import {getActiveStockMutationRequest} from "@/api/getActiveStockMutationRequest";


const useActiveStockMutationRequest = () => {
    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery( {
        queryKey: ['stock-mutation'],
        queryFn: async () => getActiveStockMutationRequest(),
        staleTime: 60 * 1000
    })

    return { data, isLoading, error, refetch }
}

export default useActiveStockMutationRequest;