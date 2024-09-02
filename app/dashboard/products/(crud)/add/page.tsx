'use client'

import {FC} from "react";
import ProductForm from "@/app/dashboard/products/(crud)/ProductForm";
import {FileWithPreview, ProductData} from "@/app/dashboard/products/types";
import axios from "axios";


const AddProductPage: FC = () => {
    const handleSubmit = (values: ProductData, images: FileWithPreview[]) => {
        const formData = new FormData()
        formData.append("product", new Blob([JSON.stringify(values)], {type: 'application/json'}))
        images.forEach(image => formData.append("images", image))
        axios.post('http://localhost:8080/api/v1/product', formData)
    }

    return <main className={"p-8"}>
        <h1 className={"text-3xl font-semibold"}>Add product</h1>
        <ProductForm handleSubmit={handleSubmit} />
    </main>
}

export default AddProductPage;