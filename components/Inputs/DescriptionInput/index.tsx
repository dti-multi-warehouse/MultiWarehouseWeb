import {FC} from "react";
import {Field, FieldProps, FormikValues} from "formik";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {InputProps} from "@/components/ui/input";


const DescriptionInput: FC<InputProps> = ({...props}) => {
    return (
        <Field name={"description"} id={"description"}>
            {({ field, form }: FieldProps<any, FormikValues>) => (
                <div className={"flex flex-col gap-3 lg:grid lg:grid-cols-3"}>
                    <Label htmlFor={"description"} className={"col-span-1"}>Description</Label>
                    <div className={"col-span-2"}>
                        <Textarea
                            name={"description"}
                            placeholder={props.placeholder}
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