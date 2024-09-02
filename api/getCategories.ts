import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";
import {Category} from "@/types/category";


const getData = async (): Promise<Category[]> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.endpoints.category,
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

export const getCategories = async (): Promise<Category[]> => {
    return await getData();
}