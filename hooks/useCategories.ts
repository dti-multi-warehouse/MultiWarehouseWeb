import {useQuery} from "react-query";
import {getCategories} from "@/api/getCategories";


const useCategories = () => {
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

export default useCategories;