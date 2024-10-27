/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActions } from "@hooks/useActions";
import { useFilters } from "@hooks/useFilters";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Slider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";

const Filters = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { updateQueryParam } = useActions();
  const {
    products: { queryParams },
  } = useFilters();

  // Начальные значения ценового диапазона
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(queryParams.minPrice) || 0,
    Number(queryParams.maxPrice) || 10000, // Предполагаем максимальную цену 10000
  ]);
  const [sort, setSort] = useState(queryParams.sort || "");

  const applyFilters = () => {
    updateQueryParam({
      key: "minPrice",
      value: priceRange[0].toString(),
      pageKey: "products",
    });
    updateQueryParam({
      key: "maxPrice",
      value: priceRange[1].toString(),
      pageKey: "products",
    });
    updateQueryParam({ key: "sort", value: sort, pageKey: "products" });
  };

  return (
    <section>
      <div className="flex flex-row gap-5 cursor-pointer" onClick={onOpen}>
        <IoFilter size={25} />
      </div>
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Фильтры</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div>
                    <Slider
                      label="Ценовой диапазон"
                      step={10}
                      minValue={0}
                      maxValue={10000}
                      defaultValue={[100, 10000]}
                      value={priceRange}
                      onChange={(e: any) => setPriceRange(e)}
                      className="mt-4"
                    />
                  </div>
                  <Select
                    label="Сортировка"
                    placeholder="Выберите вариант сортировки"
                    selectedKeys={new Set([sort])}
                    onSelectionChange={(selected) =>
                      setSort(Array.from(selected).join(""))
                    }
                  >
                    <SelectItem key="newest">Сначала новые</SelectItem>
                    <SelectItem key="oldest">Сначала старые</SelectItem>
                    <SelectItem key="high-price">Сначала дорогие</SelectItem>
                    <SelectItem key="low-price">Сначала дешевые</SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onPress={() => {
                    setPriceRange([0, 10000]);
                    setSort("");
                    onClose();
                    window.location.reload();
                  }}
                >
                  Сбросить
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
                <Button color="primary" onPress={applyFilters}>
                  Применить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default Filters;
