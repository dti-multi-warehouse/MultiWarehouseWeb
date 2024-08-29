import {Product} from "@/types/product";
import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";


const getData = async (id: number): Promise<Product> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.endpoints.product + `/${id}`,
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

export const getProductDetails = async (id: number): Promise<Product> => {
    return await getData(id);
}