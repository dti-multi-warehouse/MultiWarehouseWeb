'use client'

import {FC, useCallback, useEffect, useState} from "react";
import {FileWithPreview, ProductData} from "@/app/dashboard/products/types";
import * as Yup from "yup";
import {useDropzone} from "react-dropzone";
import {Form, Formik} from "formik";
import CustomInput from "@/components/Inputs/CustomInput";
import CategorySelector from "@/components/Inputs/CategorySelector";
import DescriptionInput from "@/components/Inputs/DescriptionInput";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import {BadgeX, ImageUp} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useDeleteProduct, useProductDetails, useUpdateProduct} from "@/hooks/useProducts";

interface Props {
    params: {
        id: number;
    },
}

const productSchema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    price: Yup.number(),
    categoryId: Yup.number(),
})

const EditProductPage: FC<Props> = ({params}) => {
    const { data, isLoading, error } = useProductDetails(params.id)
    const [ prevImages, setPrevImages] = useState<string[]>([])
    const [images, setImages] = useState<FileWithPreview[]>([])
    const router = useRouter()
    const updateProduct = useUpdateProduct()
    const deleteProduct = useDeleteProduct()

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

    useEffect(() => {
        if (data && data.imageUrls) {
            setPrevImages(data.imageUrls);
        }
    }, [data]);

    const handleRemoveImage = (i: number) => {
        setImages(prev => {
            return prev.filter((_, index) => index !== i);
        })
    }

    const handleRemovePrevImage = (i: number) => {
        setPrevImages( prev => {
            return prev.filter((_, index) => index !== i)
        })
    }

    const handleDelete = () => {
        deleteProduct.mutate(params.id)
        router.back()
    }

    const handleSubmit = (values: ProductData, images: FileWithPreview[]) => {
        const formData = new FormData()
        values.prevImages = prevImages
        formData.append("product", new Blob([JSON.stringify(values)], {type: 'application/json'}))

        if (images.length > 0) {
            images.forEach(image => formData.append("images", image))
        }
        const id = params.id
        updateProduct.mutate({formData, id})
        router.back()
    }

    if (!data || !data.name || !data.description) {
        return null
    }

    return <main className={"p-8 flex flex-col"}>
        <h1 className={"text-3xl font-semibold"}>Edit product</h1>
        <Formik
            initialValues={{
                name: data.name,
                description: data.description,
                price: data.price,
                categoryId: undefined,
            }}
            validationSchema={productSchema}
            onSubmit={(values) => handleSubmit(values, images)}>
            <Form className={"flex flex-col gap-4 p-4 lg:px-64 lg:pt-16"}>
                <CustomInput name={"name"} label={"Product Name"} placeholder={data.name || "What's the name of the product?"}/>
                <CustomInput name={"price"} label={"Price"} type={"number"} placeholder={data.price?.toString() || "How much is it going to be?"}/>
                <CategorySelector initialValue={data.category}/>
                <DescriptionInput placeholder={data.description || "Tell more about the product"}/>

                {/*Image Uploader*/}
                <div className={"flex flex-col gap-3 lg:grid lg:grid-cols-3"}>
                    <div className={"col-span-1"}>
                        <Label>Product Image</Label>
                        <p className={"text-sm font-extralight text-gray-500"}>The first image will automatically be the thumbnail</p>
                    </div>
                    <div className={"col-span-2 flex gap-4 flex-wrap"}>
                        {prevImages.map((image, index) => (
                            <div
                                key={index}
                                className="w-24 h-24 border border-dotted relative group"
                                onClick={() => handleRemovePrevImage(index)}
                            >
                                <Image
                                    src={image}
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
                <Button type={"submit"} className={"w-48 lg:w-96 mt-8 self-center"}>Edit product</Button>
            </Form>
        </Formik>
        <Button variant={"destructive"} className={"w-48 lg:w-96 self-center"} onClick={handleDelete}>Delete product</Button>
    </main>
}

export default EditProductPage;