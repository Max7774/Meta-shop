import { SearchIcon } from "@/main/UI/NavigationBar/SerchIcon";
import { TFiltersPages } from "@/types/TFilters";
import { useActions } from "@hooks/useActions";
import { useDebounce } from "@hooks/useDebounce";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ISearchProps {
  pageKey: TFiltersPages;
  className?: string;
  placeholder?: string;
}

const Search = ({ placeholder, pageKey, className }: ISearchProps) => {
  const { updateQueryParam } = useActions();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    updateQueryParam({
      key: "searchTerm",
      value: debouncedSearchTerm,
      pageKey,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className={className || undefined}>
      <Input
        fullWidth
        classNames={{
          base: "max-w-full h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-3xl",
        }}
        placeholder={placeholder || "Поиск..."}
        size="sm"
        onChange={(e) => setSearchTerm(e.target.value)}
        startContent={<SearchIcon size={18} />}
        type="search"
      />
    </div>
  );
};

export default Search;
