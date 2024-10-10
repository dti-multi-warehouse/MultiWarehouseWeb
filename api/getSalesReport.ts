import {SalesReport} from "@/types/dashboard";
import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";


const getData = async (warehouseId: number, date: Date): Promise<SalesReport> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.dashboard,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                params: {
                    warehouseId,
                    date: date.toISOString().split('T')[0],
                }
            }
        )
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getSalesReport = async (warehouseId: number, date: Date): Promise<SalesReport> => {
    return await getData(warehouseId, date);
}