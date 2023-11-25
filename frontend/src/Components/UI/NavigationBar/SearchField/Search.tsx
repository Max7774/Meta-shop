import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import SearchField from "./Field/SearchField";
import { useActions } from "@hooks/useActions";
import styles from "./Search.module.scss";
import { useDebounce } from "@hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Search = () => {
  const { searchProducts } = useActions();
  const { searchResults } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useSearchParams({ searchTerm: "" });
  const [inputValue, setInputValue] = useState(
    searchTerm.get("searchTerm") || ""
  );
  const debouncedValue = useDebounce(inputValue, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setSearchTerm({ searchTerm: debouncedValue });
    console.log(debouncedValue);
    if (debouncedValue) {
      searchProducts({
        searchTerm: debouncedValue,
        perPage: 20,
        ratings: "",
      });
    }
  }, [debouncedValue, searchProducts, setSearchTerm]);

  return (
    <div className="flex flex-col">
      <SearchField
        type="text"
        placeholder="Поиск..."
        value={inputValue}
        onChange={handleSearchChange}
      />
      {searchResults?.length !== 0 && (
        <div className={styles["search-results"]}>
          {searchResults?.map((el, i) => <div key={i}>{el}</div>)}
        </div>
      )}
    </div>
  );
};

export default Search;
