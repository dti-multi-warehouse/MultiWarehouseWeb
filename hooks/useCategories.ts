import {useQuery} from "react-query";
import {getCategories} from "@/api/getCategories";


const useProducts = () => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => getCategories(),
    })

    return { data, isLoading, error }
}

export default useProducts;