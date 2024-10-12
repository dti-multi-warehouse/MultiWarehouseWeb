import {config} from "@/constants/url";
import {FeaturedProductsDTO} from "@/types/datatypes";
import apiClient from "@/lib/apiClient";


const getData = async (): Promise<FeaturedProductsDTO> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.product + `/featured`
        const response = await apiClient.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getFeaturedProducts = async (): Promise<FeaturedProductsDTO> => {
    return await getData();
}