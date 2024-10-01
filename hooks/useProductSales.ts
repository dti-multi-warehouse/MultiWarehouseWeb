import {useQuery} from "react-query";
import {getProductSales} from "@/api/getProductSales";

const useProductSales = (warehouseId: number, date: Date) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product-sales', warehouseId, date],
        queryFn: async () => getProductSales(warehouseId, date),
    })
    return { data, isLoading, error }
}

export default useProductSales;