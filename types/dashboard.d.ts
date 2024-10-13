export interface Sales {
    saleDate: Date;
    revenue: number;
}

export interface TotalSales {
    totalRevenue: number;
    sales: Sales[]
}

export interface CategorySales {
    name: string;
    revenue: number;
    fill: string
}

export interface ProductSales {
    name: string;
    revenue: number;
}

export interface SalesReport {
    totalSales: TotalSales;
    categorySales: CategorySales[];
    productSales: ProductSales[];
}