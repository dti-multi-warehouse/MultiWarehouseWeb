'use client'

import {Form, Formik, FormikValues, useFormikContext} from "formik";
import {FC, useCallback, useMemo} from "react";
import SearchInput from "../SearchInput";
import CategoryFilters from "../CategoryFilter";
import {Button} from "@/components/ui/button";
import * as Yup from "yup";
import {useRouter, useSearchParams} from "next/navigation";
import {debounce} from "lodash";
import {InferType} from "yup";

const ProductFilterSchema = Yup.object().shape({
    query: Yup.string(),
    category: Yup.array(Yup.string()),
    // minPrice: Yup.number(),
    // maxPrice: Yup.number(),
})

type FormValues = InferType<typeof ProductFilterSchema>;

const FilterForm: FC = () => {
    const initialParams = useSearchParams()
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

    return (
        <Formik
            initialValues={{
                query: initialParams.get("query") || '',
                category: initialParams.getAll("category") || [],
            }}
            validationSchema={ProductFilterSchema}
            onSubmit={ () => {}}
        >
            {({ resetForm }) => (
                <Form
                    className={"space-y-6"}
                >
                    <FormContent debouncedSearch={debouncedSearch} />
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

export default FilterForm

interface FormContentProps {
    debouncedSearch: (values: any) => void
}

const FormContent: FC<FormContentProps> = ({debouncedSearch}) => {
    const { values, setFieldValue } = useFormikContext<FormValues>()

    const handleChange = useCallback((field: string, value: any) => {
        setFieldValue(field, value)
        debouncedSearch({...values, [field]: value})
    }, [setFieldValue, debouncedSearch, values])

    return (
        <>
            <SearchInput onChange={ value => handleChange("query", value)} />
            <CategoryFilters onChange={ value => handleChange("category", value)} />
            {/*<PriceInput />*/}
        </>
    )
}