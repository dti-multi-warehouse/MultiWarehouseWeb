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

interface CategoryDrawerDialogProps {
    children: React.ReactNode;
    mode: 'create' | 'update'
}

const CategoryDrawerDialog: FC<CategoryDrawerDialogProps> = ({children, mode}) => {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const variants = {
        create: {
            title: 'Create new category',
            handleSubmit: () => {
                console.log("Created!")
            }
        },
        update: {
            title: 'Update category',
            handleSubmit: () => {
                console.log("Updated!")
            }
        }
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{variants[mode].title}</DialogTitle>
                    </DialogHeader>
                    <CategoryForm handleSubmit={variants[mode].handleSubmit} />
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
                    <DrawerTitle>{variants[mode].title}</DrawerTitle>
                </DrawerHeader>
                <CategoryForm className="px-4" handleSubmit={variants[mode].handleSubmit} />
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

interface CategoryFormProps {
    className?: string
    handleSubmit: () => void
}

const CategoryForm: FC<CategoryFormProps> = ({ className, handleSubmit }) => {
    return (
        <Formik
            initialValues={{ category: '' }}
            onSubmit={ (values) => handleSubmit()}
        >

            <Form className={cn("grid items-start gap-4", className)}>
                <Field name={"category"} className="grid gap-2">
                    {({ field, form}: FieldProps<any, FormikValues>) => (
                        <>
                            <Label htmlFor={"category"} className={"lg:col-span-1"}>Category Name</Label>
                            <Input {...field} />
                            {form.touched["category"] && form.errors["category"] && (
                                <div className="text-red-500 text-sm mt-1">{form.errors["category"]?.toString()}</div>
                            )}
                        </>
                    )}
                </Field>
                <Button type="submit">Save changes</Button>
            </Form>
        </Formik>
    )
}