import {OrderResponseDto} from "@/types/order";
import {config} from "@/constants/url";
import apiClient from "@/lib/apiClient";


const getData = async (userId: number, page: number): Promise<OrderResponseDto> => {
    try {
        const url = config.BASE_URL + config.API_VER + config.endpoints.order + `/user/${userId}`
        const response = await apiClient.get(url, {
            params: {
                page
            }
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getUserOrder = async (userId: number, productId: number) => {
    return await getData(userId, productId);
}