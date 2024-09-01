"use client"

import {FC, useCallback} from "react";
import {Form, Formik} from "formik";
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


const productSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    categoryId: Yup.number().required("Category is required"),
})

const ProductForm: FC = () => {
    // const onDrop = useCallback(acceptedFile => {
    //     console.log(acceptedFile)
    // }, [])
    // const { getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


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
            onSubmit={values => console.log(values)}>
            <Form className={"flex flex-col"}>
                <CustomInput name={"name"} label={"Product Name"} placeholder={"What's the name of the product?"}/>
                <CustomInput name={"price"} label={"Price"} placeholder={"How much is it going to be?"}/>
                <CustomInput name={"stock"} label={"Stock"} placeholder={"Stock"}/>
                <CategorySelector/>
                <DescriptionInput/>
                <ImageUploader />
                <button type={"submit"}>button</button>
            </Form>
        </Formik>
    )
}

export default ProductForm