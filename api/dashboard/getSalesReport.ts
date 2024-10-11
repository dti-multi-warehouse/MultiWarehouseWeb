import {SalesReport} from "@/types/dashboard";
import {config} from "@/constants/url";
import apiClient from "@/lib/apiClient";


const getData = async (warehouseId: number, date: Date): Promise<SalesReport> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.dashboard
        const response = await apiClient.get(url, {
            params: {
                warehouseId,
                date: date.toISOString().split('T')[0],
            }
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getSalesReport = async (warehouseId: number, date: Date): Promise<SalesReport> => {
    return await getData(warehouseId, date);
}