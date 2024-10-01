import {ProductCategorySalesResponse} from "@/types/dashboard";
import axios from "axios";
import {config} from "@/constants/url";


const getDate = async (warehouseId: number, date: Date): Promise<ProductCategorySalesResponse[]> => {
    try {
        const response = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.dashboard + "/category",
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
        throw error
    }
}

export const getCategorySales = async (warehouseId: number, date: Date): Promise<ProductCategorySalesResponse[]> => {
    return await getDate(warehouseId, date)
}