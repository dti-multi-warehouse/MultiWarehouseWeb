import {useQuery} from "react-query";
import {getAllStocks} from "@/api/getAllStocks";


const useAllStocks = (warehouseId: number, date: Date) => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['stocks', warehouseId, date],
        queryFn: async () => getAllStocks(warehouseId, date),
    })
    return { data, isLoading, error }
}

export default useAllStocks;