import { forwardRef } from "react";
import { ISearchField } from "./search-field.interface";
import styles from "./SearchField.module.scss";
import cn from "clsx";

const SearchField = forwardRef<HTMLInputElement, ISearchField>(
  ({ type, placeholder, isLoading, isInput, ...rest }, ref) => {
    return (
      <div className="flex flex-row items-center justify-center">
        <input
          className={cn(styles["search_field"], {
            "rounded-b-none rounded-t-xl": isInput,
            "rounded-xl": !isInput,
          })}
          {...rest}
          ref={ref}
          type={type}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

export default SearchField;
