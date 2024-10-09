import {OrderResponseDto} from "@/types/order";
import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";


const getData = async (warehouseId: number, page: number): Promise<OrderResponseDto> => {
    try {
        const res: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.order + `/admin/${warehouseId}`,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                params: {
                    page
                }
            }
        )
        return res.data.data;
    } catch (error) {
        throw error;
    }
}

export const getAdminOrder = async (warehouseId: number, productId: number) => {
    return await getData(warehouseId, productId);
}