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

interface IStatusSortProps {
  setSelectedStatus: React.Dispatch<React.SetStateAction<EOrder>>;
}

const StatusSort = ({ setSelectedStatus }: IStatusSortProps) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([EOrder.Canceled]));

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
        <Button variant="solid" size="md" fullWidth>
          {selectedValue}
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
        <DropdownItem key={EOrder.Canceled}>Отменен</DropdownItem>
        <DropdownItem key={EOrder.Delivered}>Доставлен</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default StatusSort;
