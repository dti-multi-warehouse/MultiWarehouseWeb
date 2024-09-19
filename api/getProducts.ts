import {config} from "@/constants/url";
import {ProductSearchQueryParams, ProductSearchResult} from "@/types/product";
import axios, {AxiosResponse} from "axios";
import {ReadonlyURLSearchParams} from "next/navigation";

const getData = async (params: ReadonlyURLSearchParams) : Promise<ProductSearchResult> => {
    const url = new URL(config.endpoints.product, config.BASE_URL + config.API_VER)
    url.searchParams.set("query", params.get("query") || "")
    url.searchParams.set("page", String(params.get("page") || 1));
    url.searchParams.set("perPage", String(params.get("perPage") || 20));
    if (params.get("category")) {
        params.getAll("category").forEach( cat => url.searchParams.append("category", cat));
    }
    try {
        const response: AxiosResponse = await axios.get(
            url.toString(),
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getProducts = async ( params: ReadonlyURLSearchParams) => {
    return await getData(params) as ProductSearchResult;
}