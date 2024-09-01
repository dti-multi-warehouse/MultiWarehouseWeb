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
                <>
                    <Label htmlFor={name}>{label}</Label>
                    <Input {...field} {...props} />
                    {form.touched[name] && form.errors[name] && (
                        <div className="text-red-500 text-sm mt-1">{form.errors[name]?.toString()}</div>
                    )}
                </>
            )}
        </Field>
    )
}

export default CustomInput;