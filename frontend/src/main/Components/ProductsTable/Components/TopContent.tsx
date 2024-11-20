import Search from "@Components/Search/Search";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  Selection,
  SelectItem,
} from "@nextui-org/react";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import { capitalize } from "../utils/utils";
import { columns, selectedRow } from "../data/data";
import { useActions } from "@hooks/useActions";

interface ITopContentProps {
  onRowsPerPageChange: (perPage: number) => void;
  statusFilter: Selection;
  setStatusFilter: React.Dispatch<React.SetStateAction<Selection>>;
  visibleColumns: Selection;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
  rowsPerPage: number;
}

const TopContent = ({
  onRowsPerPageChange,
  visibleColumns,
  setVisibleColumns,
  rowsPerPage,
}: ITopContentProps) => {
  const { resetFilters } = useActions();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Search
          pageKey="products"
          className="w-full sm:max-w-[44%]"
          placeholder="Поиск по названию..."
        />
        <div className="flex gap-3">
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
          <Button
            variant="flat"
            onClick={() => resetFilters({ pageKey: "products" })}
          >
            Сбросить фильтры
          </Button>
        </span>
        <label className="flex items-center text-default-400 text-small">
          <span className="mr-2">Количество строк:</span>
          <Select
            variant="bordered"
            aria-label="Количество строк"
            placeholder="Количество строк"
            selectedKeys={[rowsPerPage.toString()]}
            className="w-[150px]"
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              onRowsPerPageChange(+selectedKey);
            }}
          >
            {selectedRow.map((el) => (
              <SelectItem key={el.toString()}>{el.toString()}</SelectItem>
            ))}
          </Select>
        </label>
      </div>
    </div>
  );
};

export default TopContent;
