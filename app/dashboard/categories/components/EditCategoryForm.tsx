'use client'
import {FC, useCallback, useEffect, useState} from "react";
import {FileWithPreview} from "@/app/dashboard/products/types";
import {useAddCategory, useCategory, useDeleteCategory, useUpdateCategory} from "@/hooks/useCategories";
import {useDropzone} from "react-dropzone";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {BadgeX, ImageUp} from "lucide-react";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {values} from "lodash";

interface EditCategoryFormProps {
    className?: string,
    id: number,
    setOpen: (open: boolean) => void
}

const EditCategoryForm: FC<EditCategoryFormProps> = ({ className, id, setOpen }) => {
    const {data, isLoading, error} = useCategory(id)
    const [logo, setLogo] = useState<FileWithPreview | undefined>(undefined);
    const updateCategory = useUpdateCategory()
    const deleteCategory = useDeleteCategory()

    const onDrop = useCallback((file: File[]) => {
        const image = file[0]
        const fileWithPreview = Object.assign(image, {
            preview: URL.createObjectURL(image)
        })

        setLogo(fileWithPreview);
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
        return () => {
            if (logo) {
                URL.revokeObjectURL(logo.preview);
            }
        };
    }, [logo]);

    useEffect(() => {
        const createFileWithPreview = async () => {
            if (!data) return
            try {
                const imageUrl = data.logoUrl
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const fileName = imageUrl.split('/').pop() || 'image';
                const file = new File([blob], fileName, { type: blob.type });
                const customFile: FileWithPreview = {
                    ...file,
                    preview: imageUrl,
                };

                setLogo(customFile as FileWithPreview);
            } catch (error) {
                setLogo(undefined);
            }
        };
        createFileWithPreview();
    }, [data]);

    const handleRemoveLogo = () => {
        setLogo(undefined);
    }

    const handleUpdate = (values: {name: string}) => {
        const formData = new FormData()
        formData.append("requestDto", new Blob([JSON.stringify(values)], { type: "application/json" }))
        if (data?.logoUrl !== logo?.preview && logo) {
            formData.append("logo", logo)
        }
        updateCategory.mutate({formData, id})
        setOpen(false)
    }

    const handleDelete = () => {
        if (!id) return
        deleteCategory.mutate(id)
        setOpen(false)
    }

    return (
        <div className={className}>
            <Formik
                initialValues={{ name: data?.name || '' }}
                onSubmit={ (values) => {
                    if (!id || !values.name) return
                    handleUpdate(values)
                    setOpen(false)
                }}
            >
                <Form className={cn("grid items-start gap-4")}>
                    <Field name={"name"} className="grid gap-2">
                        {({ field, form}: FieldProps<any, FormikValues>) => (
                            <>
                                <Label htmlFor={"name"} className={"lg:col-span-1"}>Category Name</Label>
                                <Input {...field} />
                                {form.touched["name"] && form.errors["name"] && (
                                    <div className="text-red-500 text-sm mt-1">{form.errors["name"]?.toString()}</div>
                                )}
                                <div className={"flex flex-col gap-2"}>
                                    <Label htmlFor={"logo"} className={"lg:col-span-1"}>Logo</Label>
                                    {logo ? (
                                        <div
                                            className="w-24 h-24 border border-dotted relative group"
                                            onClick={() => handleRemoveLogo()}
                                        >
                                            <Image
                                                src={logo.preview}
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
                                    ) : (
                                        <div
                                            className={"w-24 h-24 border border-dotted flex items-center justify-center cursor-pointer"} {...getRootProps()}>
                                            <input {...getInputProps()} name={"logo"}/>
                                            <ImageUp className={"text-gray-500"}/>
                                        </div>)}
                                </div>
                            </>
                        )}
                    </Field>
                    <Button type="submit" disabled={!logo}>Save changes</Button>
                </Form>
            </Formik>
            <Button variant={"destructive"} onClick={handleDelete}>Delete product</Button>
        </div>
    )
}

export default EditCategoryForm