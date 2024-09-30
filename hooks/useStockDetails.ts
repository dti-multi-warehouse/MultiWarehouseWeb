import {useQuery} from "react-query";
import {getStockDetails} from "@/api/getStockDetails";


const useStockDetails = () => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['stocks', 'details'],
        queryFn: async () => getStockDetails(),
    })

    return { data, isLoading, error }
}

export default useStockDetails;