import {useQuery} from "react-query";
import {getAllStocks} from "@/api/getAllStocks";


const useAllStocks = () => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['stocks'],
        queryFn: async () => getAllStocks(),
    })

    return { data, isLoading, error }
}

export default useAllStocks;