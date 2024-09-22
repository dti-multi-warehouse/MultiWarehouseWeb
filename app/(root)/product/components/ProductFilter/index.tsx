'use client'
import { FC, useMemo, useState} from "react";
import {Button} from "@/components/ui/button";
import SearchInput from "@/app/(root)/product/components/ProductFilter/SearchInput";
import CategoryFilters from "@/app/(root)/product/components/ProductFilter/CategoryFilter";
import {Form, Formik, FormikValues} from "formik";
import * as Yup from "yup";
import {debounce} from "lodash";
import useMediaQuery from "@/hooks/useMediaQuery";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {useRouter} from "next/navigation";

const ProductFilterSchema = Yup.object().shape({
    query: Yup.string(),
    categories: Yup.array(Yup.string()),
    // minPrice: Yup.number(),
    // maxPrice: Yup.number(),
})

const ProductFilter:FC = () => {
    const [Open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const router = useRouter()

    const debouncedSearch = useMemo(
        () => debounce( (values) => {
            const newParams = new URLSearchParams()
            Object.entries(values).forEach(([key, value]) => {
                if (value) newParams.set(key, value.toString());
            })
            router.push(`?${newParams}`, {scroll: false})
        }, 300), [router]
    )

    if (!isDesktop) {
        return (
            <Drawer open={Open} onOpenChange={setOpen}>
                <DrawerTrigger asChild >
                    <Button variant={"outline"}>Filter</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <FilterForm debouncedSearch={debouncedSearch} />
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <div className={"col-span-1 p-4 rounded-lg shadow border h-fit"}>
            <FilterForm debouncedSearch={debouncedSearch} />
        </div>
    )
}

export default ProductFilter;

interface FilterFormProps {
    debouncedSearch: (values: FormikValues) => void
}

const FilterForm: FC<FilterFormProps> = ({debouncedSearch}) => {
    return (
        <Formik
            initialValues={{
                query: '',
                categories: [],
            }}
            validationSchema={ProductFilterSchema}
            onSubmit={values => {
                console.log(values);
            }}
        >
            {({ values, resetForm }) => (
                <Form
                    className={"space-y-6"}
                    onChange={() => debouncedSearch(values)}
                >
                    <SearchInput />
                    <CategoryFilters />
                    {/*<PriceInput />*/}
                    <Button
                        variant="outline"
                        onClick={() => resetForm()}
                        className={"w-full"}
                    >
                        Clear filters
                    </Button>
                </Form>
            )}
        </Formik>
    )
}