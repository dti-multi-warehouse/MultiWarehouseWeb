import {DashboardProducts} from "@/types/product";
import axios, {AxiosResponse} from "axios";
import {config} from "@/constants/url";


const getData = async (): Promise<DashboardProducts[]> => {
    try {
        const response: AxiosResponse = await axios.get(
            config.BASE_URL + config.API_VER + config.endpoints.product + `/dashboard`,
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

export const getDashboardProducts = async (): Promise<DashboardProducts[]> => {
    return await getData();
}