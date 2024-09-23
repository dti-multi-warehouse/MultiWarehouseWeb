import {useQuery} from "react-query";
import {getActiveStockMutationRequest} from "@/api/getActiveStockMutationRequest";


const useActiveStockMutationRequest = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery( {
        queryKey: ['stock-mutation'],
        queryFn: async () => getActiveStockMutationRequest()
    })

    return { data, isLoading, error }
}

export default useActiveStockMutationRequest;