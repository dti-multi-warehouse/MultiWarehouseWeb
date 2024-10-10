import {useQuery} from "react-query";
import {getSalesReport} from "@/api/getSalesReport";


const useSalesReport = (warehouseId: number, date: Date) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['sales-report', warehouseId, date],
        queryFn: async () => getSalesReport(warehouseId, date),
    })
    return { data, isLoading, error }
}

export default useSalesReport;