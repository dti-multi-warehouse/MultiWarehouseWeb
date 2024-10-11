import {useQuery} from "react-query";
import {getAllStocks} from "@/api/getAllStocks";


const useAllStocks = (warehouseId: number, date: Date, query: string, page: number, perPage: number) => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['stocks', warehouseId, date, query, page, perPage],
        queryFn: async () => getAllStocks(warehouseId, date, query, page, perPage),
    })
    return { data, isLoading, error }
}

export default useAllStocks;