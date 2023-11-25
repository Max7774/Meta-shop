import { forwardRef } from "react";
import { ISearchField } from "./search-field.interface";
import styles from "./SearchField.module.scss";

const SearchField = forwardRef<HTMLInputElement, ISearchField>(
  ({ type, placeholder, isLoading, ...rest }, ref) => {
    return (
      <input
        className={styles["search_field"]}
        {...rest}
        ref={ref}
        type={type}
        placeholder={placeholder}
      />
    );
  }
);

export default SearchField;
