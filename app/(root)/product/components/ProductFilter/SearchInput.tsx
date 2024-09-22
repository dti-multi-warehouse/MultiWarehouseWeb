import {FC, useState} from "react";
import {Input} from "@/components/ui/input";
import {BiSearch} from "react-icons/bi";
import {clsx} from "clsx";
import {useField} from "formik";


const SearchInput: FC = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [field] = useField("query")
    return (
        <div className={clsx("relative flex items-center rounded-xl overflow-hidden border-2 border-input h-fit", isFocused && 'border-primary')}>
            <Input
                {...field}
                type="text"
                placeholder="Search for products..."
                className={"border-0 focus-visible:ring-0 focus-visible:ring-offset-0"}
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