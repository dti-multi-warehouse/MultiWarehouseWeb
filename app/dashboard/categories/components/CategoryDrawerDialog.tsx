'use client'
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useMediaQuery from "@/hooks/useMediaQuery";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import {FC, useCallback, useEffect, useState} from "react";
import {useAddCategory, useDeleteCategory, useUpdateCategory} from "@/hooks/useCategories";
import {FileWithPreview} from "@/app/dashboard/products/types";
import {useDropzone} from "react-dropzone";
import {ImageUp} from "lucide-react";

interface CategoryDrawerDialogProps {
    children: React.ReactNode,
    mode: 'create' | 'update',
    id?: number
}

interface CategoryFormProps {
    className?: string,
    mode: "create" | "update",
    id?: number,setOpen: (open: boolean) => void

}

interface FormValue {
    category: string
}

const CategoryDrawerDialog: FC<CategoryDrawerDialogProps> = ({children, mode, id}) => {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const title = mode === "create" ? "Add new category" : "Update category"

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <CategoryForm mode={mode} id={id} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                </DrawerHeader>
                <CategoryForm className="px-4" mode={mode} id={id} setOpen={setOpen} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CategoryDrawerDialog

const CategoryForm: FC<CategoryFormProps> = ({ className, mode, id, setOpen }) => {
    const [logo, setLogo] = useState<FileWithPreview | undefined>(undefined);
    const addCategory = useAddCategory()
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

    const handleAdd = (values: {name: string}) => {
        const formData = new FormData()
        formData.append("requestDto", new Blob([JSON.stringify(values)], { type: "application/json" }), "")
        if (!logo) return
        formData.append("logo", logo)
        addCategory.mutate(formData)
    }

    const handleUpdate = (values: {name: string}) => {

    }

    const handleDelete = () => {
        if (!id) return
        deleteCategory.mutate(id)
        setOpen(false)
    }

    return (
        <Formik
            initialValues={{ name: '' }}
            onSubmit={ (values) => {
                if (mode === "create") {
                    handleAdd(values)
                } else {
                    if (!id) return
                    updateCategory.mutate({id, values})
                }
                setOpen(false)
            }}
        >

            <Form className={cn("grid items-start gap-4", className)}>
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
                                <div
                                    className={"w-24 h-24 border border-dotted flex items-center justify-center cursor-pointer"} {...getRootProps()}>
                                    <input {...getInputProps()} name={"logo"} />
                                    <ImageUp className={"text-gray-500"}/>
                                </div>
                            </div>
                        </>
                    )}
                </Field>
                <Button type="submit">Save changes</Button>
                {mode !== "create" && <Button variant={"destructive"} onClick={handleDelete}>Delete product</Button>}
            </Form>
        </Formik>
    )
}