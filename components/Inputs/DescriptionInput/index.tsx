import {FC} from "react";
import {Field, FieldProps, FormikValues} from "formik";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";


const DescriptionInput: FC = () => {
    return (
        <Field name={"description"} id={"description"}>
            {({ field, form }: FieldProps<any, FormikValues>) => (
                <>
                    <Label>Description</Label>
                    <Textarea
                        placeholder={"Tell more about the product"}
                        onChange={ currentValue => (
                            form.setFieldValue("description", currentValue.target.value)
                        )}
                    />
                </>
            )}
        </Field>
    )
}

export default DescriptionInput;