import {useQuery} from "react-query";
import {getWarehouseList} from "@/api/getWarehouseList";

const useWarehouseList = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['warehouse-list'],
        queryFn: async () => getWarehouseList(),
        staleTime: 60 * 60 * 1000
    })

    return { data, isLoading, error }
}

export default useWarehouseList;