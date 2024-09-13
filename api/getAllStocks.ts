import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";
import {Stock} from "@/types/datatypes";


const getData = async (): Promise<Stock[]> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.stock,
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

export const getAllStocks = async (): Promise<Stock[]> => {
    return await getData();
}