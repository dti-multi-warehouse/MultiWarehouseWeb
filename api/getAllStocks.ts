import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";
import {Stock} from "@/types/datatypes";


const getData = async (warehouseId: number, date: Date): Promise<Stock[]> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.stock,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                params: {
                    warehouseId: warehouseId,
                    date: date.toISOString().split('T')[0]
                }
            }
        )
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getAllStocks = async (warehouseId: number, date: Date): Promise<Stock[]> => {
    return await getData(warehouseId, date);
}