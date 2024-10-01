import {useQuery} from "react-query";
import {getCategorySales} from "@/api/getCategorySales";


const useCategorySales = (warehouseId: number, date: Date) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['category-sales', warehouseId, date],
        queryFn: async () => getCategorySales(warehouseId, date),
    })
    return { data, isLoading, error }
}

export default useCategorySales;