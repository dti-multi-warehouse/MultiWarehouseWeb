import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {FC} from "react";
import {Category} from "@/types/category";
import {useField} from "formik";

interface CategoryCheckboxProps extends Category{
    updateValue: (value: any[]) => void;
}

const CategoryCheckbox: FC<CategoryCheckboxProps> = ({id, name, updateValue}) => {
    const [_, meta] = useField({
        name: "category",
        type: "checkbox",
        value: name
    })

    const { value: selectedCategories } = meta

    const isChecked = Array.isArray(selectedCategories) && selectedCategories.includes(name);

    const handleChange = () => {
        const newSelectedCategories = isChecked
            ? selectedCategories.filter((category: string) => category !== name)
            : [...selectedCategories, name];
        updateValue(newSelectedCategories);
    };

    return (
        <div key={id} className={"flex items-center gap-4"}>
            <Checkbox
                id={name}
                checked={isChecked}
                onCheckedChange={handleChange}
            />
            <Label htmlFor={name}>{name}</Label>
        </div>
    )
}

export default CategoryCheckbox;