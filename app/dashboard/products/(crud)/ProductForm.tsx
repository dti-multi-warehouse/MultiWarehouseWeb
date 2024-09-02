"use client"

import {FC, useCallback, useEffect, useState} from "react";
import {Form, Formik, FormikValues} from "formik";
import CustomInput from "@/components/Inputs/CustomInput";
import CategorySelector from "@/components/Inputs/CategorySelector";
import DescriptionInput from "@/components/Inputs/DescriptionInput";
import * as Yup from "yup";
import {useDropzone} from "react-dropzone";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ImageUploader from "@/app/dashboard/products/(crud)/components/ImageUploader";
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {json} from "node:stream/consumers";

interface FileWithPreview extends File {
    preview: string;
}

const productSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    categoryId: Yup.number().required("Category is required"),
})

const ProductForm: FC = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => [
            ...prevFiles,
            ...acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
        ]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop
    });

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);


    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                price: 0,
                stock: 0,
                categoryId: 0
            }}
            validationSchema={productSchema}
            onSubmit={values => {
                const formData = new FormData()
                formData.append("product", new Blob([JSON.stringify(values)], {type: 'application/json'}))
                files.forEach(file => formData.append("images", file))
                fetch('http://localhost:8080/api/v1/product', {
                    method: 'POST',
                    body: formData
                })
            }}>
            <Form className={"flex flex-col gap-4 px-64 py-16"}>
                <CustomInput name={"name"} label={"Product Name"} placeholder={"What's the name of the product?"}/>
                <CustomInput name={"price"} label={"Price"} placeholder={"How much is it going to be?"}/>
                <CustomInput name={"stock"} label={"Stock"} placeholder={"Stock"}/>
                <CategorySelector/>
                <DescriptionInput/>

                {/*Image Uploader*/}
                <div className={"grid grid-cols-3"}>
                    <Label className={"col-span-1"}>Product Image</Label>
                    <Carousel className={"w-96 h-96 col-span-2"}>
                        <CarouselContent className={"w-96 h-96"}>
                            {files.map((file, index) => (
                                <CarouselItem key={index}>
                                    <Image src={file.preview} alt={"alt image"} height={384} width={384} />
                                </CarouselItem>
                            ))}
                            <CarouselItem {...getRootProps()} className={"flex items-center justify-center bg-gray-400 text-white"}>
                                <input {...getInputProps()} className={""}/>
                                <p>Add picture</p>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext />
                    </Carousel>
                </div>
                <Button type={"submit"} className={"w-48 self-center mt-20"}>Add product</Button>
            </Form>
        </Formik>
    )
}

export default ProductForm