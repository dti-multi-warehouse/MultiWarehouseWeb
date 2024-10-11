import {useQuery} from "react-query";
import {getAdminOrder} from "@/api/order/getAdminOrder";
import {getUserOrder} from "@/api/order/getUserOrder";


const useUserOrder = (userId: number, page: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['user-order', userId, page],
        queryFn: async () => getUserOrder(userId, page),
        staleTime: 5 * 60 * 1000
    })

    return { data, isLoading, error }
}

export default useUserOrder;