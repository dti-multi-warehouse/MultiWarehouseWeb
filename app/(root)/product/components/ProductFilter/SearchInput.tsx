import {FC, useState} from "react";
import {Input} from "@/components/ui/input";
import {BiSearch} from "react-icons/bi";
import {clsx} from "clsx";
import {useFormikContext} from "formik";

interface ProductFilterInputProps {
    onChange: (value: string) => void;
}

interface FormValues {
    query: string;
}


const SearchInput: FC<ProductFilterInputProps> = ({onChange}) => {
    const [isFocused, setIsFocused] = useState(false);
    const {values} = useFormikContext<FormValues>()
    return (
        <div className={clsx("relative flex items-center rounded-xl overflow-hidden border-2 border-input h-fit", isFocused && 'border-primary')}>
            <Input
                type="text"
                placeholder="Find product"
                className={"border-0 focus-visible:ring-0 focus-visible:ring-offset-0"}
                value={values.query}
                onChange={ e => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <div className={"absolute right-2 pointer-events-none"}>
                <BiSearch size={20} className={clsx("text-muted-foreground", isFocused && "text-primary")} />
            </div>
        </div>
    )
}

export default SearchInput