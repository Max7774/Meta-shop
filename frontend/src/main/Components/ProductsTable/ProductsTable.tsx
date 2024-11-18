import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "./Icons/VerticalDotsIcon";
import { ChevronDownIcon } from "./Icons/ChevronDownIcon";
import { SearchIcon } from "./Icons/SearchIcon";
import { columns, statusOptions } from "./data/data";
import { capitalize } from "./utils/utils";
import { TProduct } from "@/types/TProduct";
import { getImageUrl } from "@utils/getImageUrl";
import { useNavigate } from "react-router-dom";

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "category",
  "inStock",
  "actions",
  "company",
  "createdAt",
];

interface IProductsTableProps {
  products: TProduct[];
}

const ProductsTable = ({ products }: IProductsTableProps) => {
  const [filterValue, setFilterValue] = React.useState("");
  const navigate = useNavigate();
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredProducts = filteredProducts.filter((product) =>
        Array.from(statusFilter).includes(JSON.stringify(product.inStock))
      );
    }

    return filteredProducts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: TProduct, b: TProduct) => {
      const firstValue = a[sortDescriptor.column as keyof TProduct];
      const secondValue = b[sortDescriptor.column as keyof TProduct];

      let first: number, second: number;

      if (typeof firstValue === "number" && typeof secondValue === "number") {
        first = firstValue;
        second = secondValue;
      } else if (
        typeof firstValue === "string" &&
        typeof secondValue === "string"
      ) {
        first = firstValue.localeCompare(secondValue);
        second = secondValue.localeCompare(firstValue);
      } else {
        first = 0;
        second = 0;
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (product: TProduct, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof TProduct]?.toString();

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: getImageUrl(product?.images[0]),
              }}
              description={product?.subcategory?.name}
              name={cellValue}
            >
              {product?.name}
            </User>
          );
        case "category":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {product?.subcategory?.category?.name}
              </p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {product?.subcategory?.name}
              </p>
            </div>
          );
        case "inStock":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[JSON.stringify(product?.inStock)]}
              size="sm"
              variant="flat"
            >
              {product?.inStock ? "В наличии" : "Нет в наличии"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu disabledKeys={["remove"]}>
                  <DropdownItem
                    onClick={() => navigate(`/product/${product?.slug}`)}
                  >
                    Карточка
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => navigate(`/admin/product/${product?.slug}`)}
                  >
                    Редактировать
                  </DropdownItem>
                  <DropdownItem color="danger" key="remove">
                    Удалить
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        case "company":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {product?.company[0]?.company.name}
              </p>
            </div>
          );
        case "createdAt":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {new Date(product?.createdAt).toLocaleString()}
              </p>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [navigate]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Поиск по названию..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Наличие
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Колонки
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Всего {products.length} продуктов
          </span>
          <label className="flex items-center text-default-400 text-small">
            Количество строк:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    products.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Назад
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Вперед
          </Button>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Таблица продуктов"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-screen",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Продуктов не найдено"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.uuid}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
