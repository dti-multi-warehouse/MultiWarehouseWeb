import {useQuery} from "react-query";
import {getProductDetails} from "@/api/getProductDetails";


const useProductDetails = (id: number) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => getProductDetails(id),
    })

    return { data, isLoading, error }
}