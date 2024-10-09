export const config = {
    BASE_URL: process.env.API_BASE_URL, //api
    API_VER: '/api/v1/',
    endpoints: {
        product: 'product',
        category: 'category',
        stock: 'stock',
        stockMutation: 'stock/mutation',
        warehouse: 'warehouse',
        dashboard: 'dashboard',
    },
}