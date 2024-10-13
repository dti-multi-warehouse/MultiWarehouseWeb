import {OrderResponseDto} from "@/types/order";
import {config} from "@/constants/url";
import apiClient from "@/lib/apiClient";


const getData = async (warehouseId: number, page: number): Promise<OrderResponseDto> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.order + `/admin/${warehouseId}`
        const response = await apiClient.get(url, {
            params: {
                page: page
            }
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getAdminOrder = async (warehouseId: number, productId: number) => {
    return await getData(warehouseId, productId);
}