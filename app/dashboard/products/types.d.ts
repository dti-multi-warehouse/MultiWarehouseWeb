export interface FileWithPreview extends File {
    preview: string;
}

export interface ProductData {
    name: string,
    description: string,
    price: number,
    categoryId: number
}