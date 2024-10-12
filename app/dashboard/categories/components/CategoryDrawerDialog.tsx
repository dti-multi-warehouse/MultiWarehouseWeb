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
import {FC} from "react";
import {useAddCategory, useDeleteCategory, useUpdateCategory} from "@/hooks/useCategories";

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
    const addCategory = useAddCategory()
    const updateCategory = useUpdateCategory()
    const deleteCategory = useDeleteCategory()
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
                    addCategory.mutate(values)
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
                        </>
                    )}
                </Field>
                <Button type="submit">Save changes</Button>
                {mode !== "create" && <Button variant={"destructive"} onClick={handleDelete}>Delete product</Button>}
            </Form>
        </Formik>
    )
}