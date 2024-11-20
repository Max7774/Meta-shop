import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { columns } from "./data/data";
import TopContent from "./Components/TopContent";
import BottomContent from "./Components/BottomContent";
import { useRenderCell } from "./HOC/RenderCell";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import { useFilters } from "@hooks/useFilters";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "category",
  "inStock",
  "actions",
  "company",
  "createdAt",
];

const ProductsTable = () => {
  const { getProductsAll, updatePageFilters } = useActions();
  const {
    products: { queryParams, pageFilters },
  } = useFilters();
  const { products, isLoading } = useProducts();

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const { renderCell } = useRenderCell();

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const onRowsPerPageChange = React.useCallback(
    (perPage: number) => {
      updatePageFilters({
        pageKey: "products",
        perPage,
        page: 1,
      });
    },
    [updatePageFilters]
  );

  useEffect(() => {
    getProductsAll(queryParams);
  }, [getProductsAll, queryParams, pageFilters]);

  return (
    <Table
      aria-label="Таблица продуктов"
      isHeaderSticky
      bottomContent={<BottomContent />}
      bottomContentPlacement="inside"
      classNames={{
        wrapper: "max-h-screen",
      }}
      sortDescriptor={sortDescriptor}
      topContent={
        <TopContent
          rowsPerPage={pageFilters.perPage}
          onRowsPerPageChange={onRowsPerPageChange}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      }
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            // align={column.uid === "actions" ? "center" : "start"}
            // allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        emptyContent={"Продуктов не найдено"}
        items={products}
      >
        {(item) => (
          <TableRow
            aria-label={item?.name}
            key={`${item?.uuid}-${new Date(item?.createdAt).toISOString()}`}
          >
            {(columnKey) => (
              <TableCell key={item?.uuid} aria-label={item?.name}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
