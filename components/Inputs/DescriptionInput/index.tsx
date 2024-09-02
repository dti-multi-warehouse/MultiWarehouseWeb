import {FC} from "react";
import {Field, FieldProps, FormikValues} from "formik";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";


const DescriptionInput: FC = () => {
    return (
        <Field name={"description"} id={"description"}>
            {({ field, form }: FieldProps<any, FormikValues>) => (
                <div className={"grid grid-cols-3"}>
                    <Label htmlFor={"description"} className={"col-span-1"}>Description</Label>
                    <div className={"col-span-2"}>
                        <Textarea
                            name={"description"}
                            placeholder={"Tell more about the product"}
                            onChange={ currentValue => (
                                form.setFieldValue("description", currentValue.target.value)
                            )}

                        />
                        {form.touched["description"] && form.errors["description"] && (
                            <div className="text-red-500 text-sm mt-1">{form.errors["description"]?.toString()}</div>
                        )}
                    </div>

                </div>
            )}
        </Field>
    )
}

export default DescriptionInput;