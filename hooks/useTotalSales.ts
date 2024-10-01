import {useQuery} from "react-query";
import {getTotalSales} from "@/api/getTotalSales";


const useTotalSales = (warehouseId: number, date: Date) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['total-sales', warehouseId, date],
        queryFn: async () => getTotalSales(warehouseId, date),
    })
    return { data, isLoading, error }
}

export default useTotalSales;