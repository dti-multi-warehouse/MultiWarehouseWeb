import {useQuery} from "react-query";
import {getFeaturedProducts} from "@/api/getFeaturedProducts";


const useFeaturedProducts = () => {
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['featured'],
        queryFn: async () => getFeaturedProducts(),
    })

    return { data, isLoading, error }
}

export default useFeaturedProducts;