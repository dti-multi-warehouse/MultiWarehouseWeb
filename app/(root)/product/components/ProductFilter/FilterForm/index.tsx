"use client";

import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import SearchInput from "../SearchInput";
import CategoryFilters from "../CategoryFilter";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { InferType } from "yup";

const ProductFilterSchema = Yup.object().shape({
  query: Yup.string(),
  category: Yup.array(Yup.string()),
});

type FormValues = InferType<typeof ProductFilterSchema>;

const FilterForm: FC = () => {
  const initialParams = useSearchParams();
  const router = useRouter();

  const [initialValues, setInitialValues] = useState<FormValues>({
    query: initialParams.get("query") || "",
    category: initialParams.getAll("category") || [],
  });

  const debouncedSearch = debounce((values: FormValues) => {
    const newParams = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val: any) => newParams.append(key, val));
      } else if (value) {
        newParams.set(key, value.toString());
      }
    });
    router.push(`?${newParams}`, { scroll: false });
  }, 300);

  // Sync initialValues with URL parameters whenever they change
  useEffect(() => {
    setInitialValues({
      query: initialParams.get("query") || "",
      category: initialParams.getAll("category") || [],
    });
  }, [initialParams]);

  return (
    <Formik
      enableReinitialize // This ensures Formik updates its state when initialValues change
      initialValues={initialValues}
      validationSchema={ProductFilterSchema}
      onSubmit={(values, { resetForm }) => {
        resetForm();
        debouncedSearch({ query: "", category: [] });
      }}
    >
      {({ handleSubmit, values, setFieldValue, resetForm }) => (
        <Form className="space-y-6" onSubmit={handleSubmit}>
          <SearchInput
            onChange={(value) => {
              setFieldValue("query", value);
              debouncedSearch({ ...values, query: value });
            }}
          />
          <CategoryFilters
            onChange={(categories) => {
              setFieldValue("category", categories);
              debouncedSearch({ ...values, category: categories });
            }}
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Clear filters programmatically
              resetForm();
              debouncedSearch({ query: "", category: [] });
            }}
            type="button"
          >
            Clear filters
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;
