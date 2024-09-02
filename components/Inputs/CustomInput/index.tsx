import {FC, HTMLAttributes} from "react";
import {Field, FieldProps, FormikValues} from "formik";
import {Input, InputProps} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface CustomInputProps extends InputProps {
    name: string
    label: string
}
const CustomInput: FC<CustomInputProps> = ({name, label, ...props}) => {
    return (
        <Field name={name}>
            {({ field, form}: FieldProps<any, FormikValues>) => (
                <div className={"grid grid-cols-3"}>
                    <Label htmlFor={name} className={"col-span-1"}>{label}</Label>
                    <div className={"col-span-2"}>
                        <Input {...field} {...props}  />
                        {form.touched[name] && form.errors[name] && (
                            <div className="text-red-500 text-sm mt-1">{form.errors[name]?.toString()}</div>
                        )}
                    </div>
                </div>
            )}
        </Field>
    )
}

export default CustomInput;