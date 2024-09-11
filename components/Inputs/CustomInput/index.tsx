import {FC, HTMLAttributes} from "react";
import {Field, FieldProps, FormikValues} from "formik";
import {Input, InputProps} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface CustomInputProps extends InputProps {
    name: string
    label: string
    type?: "text" | "number"
}
const CustomInput: FC<CustomInputProps> = ({name, label, type = "text", ...props}) => {
    return (
        <Field name={name}>
            {({ field, form}: FieldProps<any, FormikValues>) => (
                <div className={"flex flex-col gap-3 lg:grid lg:grid-cols-3"}>
                    <Label htmlFor={name} className={"lg:col-span-1"}>{label}</Label>
                    <div className={"lg:col-span-2"}>
                        <Input {...field} {...props} type={type} />
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