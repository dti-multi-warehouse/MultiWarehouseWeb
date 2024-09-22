import {FC, useMemo, useState} from "react";
import {Button} from "@/components/ui/button";
import SearchInput from "@/app/(root)/product/components/ProductFilter/SearchInput";
import CategoryFilters from "@/app/(root)/product/components/ProductFilter/CategoryFilter";
import PriceInput from "@/app/(root)/product/components/ProductFilter/PriceInput";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {debounce} from "lodash";
import useMediaQuery from "@/hooks/useMediaQuery";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {Filter} from "lucide-react";

const ProductFilterSchema = Yup.object().shape({
    query: Yup.string(),
    categories: Yup.array(Yup.string()),
    // minPrice: Yup.number(),
    // maxPrice: Yup.number(),
})

const ProductFilter:FC = () => {
    const [Open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    // const debounceSearch = useMemo(
    //     () => debounce( values =>)
    // )

    if (!isDesktop) {
        return (
            <Drawer open={Open} onOpenChange={setOpen}>
                <DrawerTrigger asChild >
                    <Button variant={"outline"}>Filter</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <FilterForm />
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <div className={"col-span-1 p-4 rounded-lg shadow border h-fit"}>
            <FilterForm />
        </div>
    )
}

export default ProductFilter;

const FilterForm: FC = () => {
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
            {({ resetForm }) => (
                <Form className={"space-y-6"}>
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