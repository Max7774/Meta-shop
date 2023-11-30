import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import SearchField from "./Field/SearchField";
import { useActions } from "@hooks/useActions";
import styles from "./Search.module.scss";
import { useDebounce } from "@hooks/useDebounce";
import { useEffect, useState } from "react";

const Search = () => {
  const { searchProducts } = useActions();
  const { searchResults } = useAppSelector((state) => state.products);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedValue) {
      searchProducts({
        searchTerm: debouncedValue,
        perPage: 20,
        ratings: "",
      });
    }
  }, [debouncedValue, searchProducts]);

  return (
    <div className="flex flex-col">
      <SearchField
        type="text"
        placeholder="Поиск..."
        value={inputValue}
        onChange={handleSearchChange}
        isInput={inputValue?.length !== 0}
      />
      {inputValue?.length !== 0 && (
        <div className={styles["search-results"]}>
          {searchResults?.map((el, i) => <div key={i}>{el}</div>)}
        </div>
      )}
    </div>
  );
};

export default Search;
