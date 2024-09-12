import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";
import {FeaturedProductsDTO} from "@/types/datatypes";


const getData = async (): Promise<FeaturedProductsDTO> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.product + `/featured`,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getFeaturedProducts = async (): Promise<FeaturedProductsDTO> => {
    return await getData();
}