'use client'

import {FC, useCallback, useEffect, useState} from "react";
import {FileWithPreview, ProductData} from "@/app/dashboard/products/types";
import axios from "axios";
import {useDropzone} from "react-dropzone";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import CustomInput from "@/components/Inputs/CustomInput";
import CategorySelector from "@/components/Inputs/CategorySelector";
import DescriptionInput from "@/components/Inputs/DescriptionInput";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import {BadgeX, ImageUp} from "lucide-react";
import {Button} from "@/components/ui/button";

const productSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    categoryId: Yup.number().required("Category is required"),
})

const AddProductPage: FC = () => {
    const [images, setImages] = useState<FileWithPreview[]>([]);

    const onDrop = useCallback((acceptedImages: File[]) => {
        setImages(prevImages => [
            ...prevImages,
            ...acceptedImages.map(image =>
                Object.assign(image, {
                    preview: URL.createObjectURL(image)
                })
            )
        ]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
            'image/gif': ['.gif']
        },
        onDrop,
        maxSize: 1000000
    });

    useEffect(() => {
        return () => images.forEach(image => URL.revokeObjectURL(image.preview));
    }, [images]);

    const handleRemoveImage = (i: number) => {
        setImages(prev => {
            return prev.filter((_, index) => index !== i);
        })
    }

    const handleSubmit = (values: ProductData, images: FileWithPreview[]) => {
        const formData = new FormData()
        formData.append("product", new Blob([JSON.stringify(values)], {type: 'application/json'}))
        images.forEach(image => formData.append("images", image))
        axios.post('http://localhost:8080/api/v1/product', formData)
    }

    return <main className={"p-8"}>
        <h1 className={"text-3xl font-semibold"}>Add product</h1>
        <Formik
            initialValues={{
                name: '',
                description: '',
                price: 0,
                categoryId: 0
            }}
            validationSchema={productSchema}
            onSubmit={(values) => handleSubmit(values, images)}>
            <Form className={"flex flex-col gap-4 p-4 lg:px-64 lg:py-16"}>
                <CustomInput name={"name"} label={"Product Name"} placeholder={"What's the name of the product?"}/>
                <CustomInput name={"price"} label={"Price"} type={"number"} placeholder={"How much is it going to be?"}/>
                <CategorySelector/>
                <DescriptionInput placeholder={"Tell more about the product"}/>

                {/*Image Uploader*/}
                <div className={"flex flex-col gap-3 lg:grid lg:grid-cols-3"}>
                    <div className={"col-span-1"}>
                        <Label>Product Image</Label>
                        <p className={"text-sm font-extralight text-gray-500"}>The first image will automatically be the thumbnail</p>
                    </div>
                    <div className={"col-span-2 flex gap-4 flex-wrap"}>
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="w-24 h-24 border border-dotted relative group"
                                onClick={() => handleRemoveImage(index)}
                            >
                                <Image
                                    src={image.preview}
                                    alt="Product image"
                                    fill
                                    style={{objectFit: "cover"}}
                                    className="z-0 cursor-pointer"
                                />
                                <div
                                    className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <BadgeX className="text-red-500 bg-white rounded-full"/>
                                </div>
                            </div>
                        ))}
                        <div
                            className={"w-24 h-24 border border-dotted flex items-center justify-center cursor-pointer"} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <ImageUp className={"text-gray-500"}/>
                        </div>
                    </div>
                </div>
                <Button type={"submit"} className={"w-48 self-center mt-20"}>Add product</Button>
            </Form>
        </Formik>
    </main>
}

export default AddProductPage;