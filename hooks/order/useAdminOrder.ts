import {useQuery} from "react-query";
import {getAdminOrder} from "@/api/order/getAdminOrder";


const useAdminOrder = (warehouseId: number, page: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['admin-order', warehouseId, page],
        queryFn: async () => getAdminOrder(warehouseId, page),
        staleTime: 5 * 60 * 1000
    })

    return { data, isLoading, error }
}

export default useAdminOrder;