import { TCompany } from "@/types/TCompany";
import { TFilters } from "@/types/TFilters";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { useFilters } from "@hooks/useFilters";
import { Chip } from "@nextui-org/react";
import { convertPrice } from "@utils/convertPrice";

// Функция для получения названия категории по UUID
const getCategoryName = (uuid: string) => {
  // Здесь вы можете использовать список категорий или запросить название по UUID
  const categories = [
    { uuid: "cat-1", name: "Категория 1" },
    { uuid: "cat-2", name: "Категория 2" },
    // Добавьте другие категории
  ];
  const category = categories.find((cat) => cat.uuid === uuid);
  return category ? category.name : uuid;
};

// Функция для получения читаемого названия сортировки
const getSortLabel = (value: string) => {
  switch (value) {
    case "newest":
      return "Сначала новые";
    case "oldest":
      return "Сначала старые";
    case "high-price":
      return "Сначала дорогие";
    case "low-price":
      return "Сначала дешевые";
    default:
      return value;
  }
};

// Функция для получения читаемого названия фильтра
const getFilterLabel = (key: string, value: string, companies: TCompany[]) => {
  switch (key) {
    case "minPrice":
      return `Мин: ${convertPrice(Number(value))}`;
    case "maxPrice":
      return `Макс: ${convertPrice(Number(value))}`;
    case "ratings":
      return `Рейтинг: ${value}+`;
    case "categoryUuid":
      return `Категория: ${getCategoryName(value)}`;
    case "companyUuid":
      return `${companies.find((item) => item.uuid === value)?.name}`;
    case "sort":
      return `${getSortLabel(value)}`;
    case "searchTerm":
      return `${value}`;
    default:
      return `${key}: ${value}`;
  }
};

const ChipFilters = () => {
  const {
    products: { queryParams },
  } = useFilters();
  const { updateQueryParam } = useActions();
  const { companies } = useAppSelector((state) => state.company);

  // Преобразуем фильтры в массив для отображения
  const filters = Object.entries(queryParams).filter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_key, value]) => value && value !== ""
  );

  // Функция для удаления фильтра
  const removeFilter = (key: string) => {
    updateQueryParam({
      key: key as keyof TFilters,
      value: "",
      pageKey: "products",
    });
  };

  if (filters.length === 0) return null; // Если фильтров нет, ничего не отображаем

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map(([key, value]) => (
        <Chip
          key={key}
          size="md"
          variant="flat"
          isDisabled={key === "sort"}
          className="flex items-center"
          onClick={() => removeFilter(key)}
        >
          {getFilterLabel(key, value, companies)}
          <span className="ml-2 cursor-pointer">&times;</span>
        </Chip>
      ))}
    </div>
  );
};

export default ChipFilters;
