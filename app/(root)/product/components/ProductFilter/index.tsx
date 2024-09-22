import {FC, useMemo} from "react";
import {Button} from "@/components/ui/button";
import SearchInput from "@/app/(root)/product/components/ProductFilter/SearchInput";
import CategoryFilters from "@/app/(root)/product/components/ProductFilter/CategoryFilter";
import PriceInput from "@/app/(root)/product/components/ProductFilter/PriceInput";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {debounce} from "lodash";

const ProductFilterSchema = Yup.object().shape({
    query: Yup.string(),
    categories: Yup.array(Yup.string()),
    // minPrice: Yup.number(),
    // maxPrice: Yup.number(),
})

const ProductFilter:FC = () => {

    // const debounceSearch = useMemo(
    //     () => debounce( values =>)
    // )
    return (
        <div className={"col-span-1 p-4 rounded-lg shadow border h-fit"}>
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
        </div>
    )
}

export default ProductFilter;