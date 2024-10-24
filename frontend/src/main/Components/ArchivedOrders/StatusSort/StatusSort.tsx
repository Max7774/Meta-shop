/* eslint-disable @typescript-eslint/no-explicit-any */
import { EOrder } from "@enums/EOrder";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { FiArrowDown } from "react-icons/fi";

interface IStatusSortProps {
  setSelectedStatus: React.Dispatch<React.SetStateAction<EOrder>>;
}

const StatusSort = ({ setSelectedStatus }: IStatusSortProps) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([EOrder.Delivered]));

  const selectedValue = useMemo(() => {
    const key = Array.from(selectedKeys)[0];
    switch (key) {
      case EOrder.Canceled:
        return "Статус: Отменен";
      case EOrder.Delivered:
        return "Статус: Доставлен";
      default:
        return "";
    }
  }, [selectedKeys]);

  const handleStatusChange = (keys: any) => {
    setSelectedKeys(keys);
    setSelectedStatus(Array.from(keys)[0] as any);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded" color="default" size="md" fullWidth>
          <span>{selectedValue}</span>
          <span>
            <FiArrowDown />
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleStatusChange}
      >
        <DropdownItem key={EOrder.Delivered}>Доставлен</DropdownItem>
        <DropdownItem key={EOrder.Canceled}>Отменен</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default StatusSort;
