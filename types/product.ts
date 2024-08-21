

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
}

export interface ProductSummary {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
}

interface hit {
    document: ProductSummary;
}

export interface ProductSearchResult {
    found: number;
    page: number;
    perPage: number;
    totalPage: number;
    hits: hit[];
}

export interface ProductSearchQueryParams {
    query?: string,
    page?: number,
    perPage?: number,
    category?: number[]
}