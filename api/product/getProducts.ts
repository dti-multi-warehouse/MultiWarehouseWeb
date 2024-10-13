import {config} from "@/constants/url";
import {ProductSearchResult} from "@/types/product";
import {ReadonlyURLSearchParams} from "next/navigation";
import apiClient from "@/lib/apiClient";

const getData = async (params: ReadonlyURLSearchParams) : Promise<ProductSearchResult> => {
    const url = new URL(config.endpoints.product, config.BASE_URL + config.API_VER)
    url.searchParams.set("query", params.get("query") || "")
    url.searchParams.set("page", String(params.get("page") || 1));
    url.searchParams.set("perPage", String(params.get("perPage") || 20));
    if (params.get("category")) {
        params.getAll("category").forEach( cat => url.searchParams.append("category", cat));
    }
    try {
        const response = await apiClient.get(url.toString())
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getProducts = async ( params: ReadonlyURLSearchParams) => {
    return await getData(params) as ProductSearchResult;
}