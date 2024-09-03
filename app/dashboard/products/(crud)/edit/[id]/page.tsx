'use client'

import {FC} from "react";
import {FileWithPreview, ProductData} from "@/app/dashboard/products/types";
import axios from "axios";
import useProductDetails from "@/hooks/useProductDetails";

interface Props {
    params: {
        id: number;
    },
}

const EditProductPage: FC<Props> = ({params}) => {
    const { data, isLoading, error } = useProductDetails(params.id)

    const handleSubmit = (values: ProductData, images: FileWithPreview[]) => {
        const formData = new FormData()
        formData.append("product", new Blob([JSON.stringify(values)], {type: 'application/json'}))
        images.forEach(image => formData.append("images", image))
        axios.post('http://localhost:8080/api/v1/product', formData)
    }
    return <main className={"p-8"}>
        <h1 className={"text-3xl font-semibold"}>Edit product</h1>
    </main>
}

export default EditProductPage;