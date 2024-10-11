import {WarehouseList} from "@/types/warehouse";
import {config} from "@/constants/url";
import apiClient from "@/lib/apiClient";


const getData = async (): Promise<WarehouseList[]> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.warehouse + "/list"
        const response = await apiClient.get(url)
        return response.data.data;
    } catch (error) {
        throw error
    }
}

export const getWarehouseList = async (): Promise<WarehouseList[]> => {
    return await getData();
}