/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
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
import { FaFilter } from "react-icons/fa6";

const Filters = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { updateQueryParam } = useActions();
  const {
    products: { queryParams },
  } = useFilters();
  const { companies } = useAppSelector((state) => state.company);

  // Начальные значения ценового диапазона
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(queryParams.minPrice) || 0,
    Number(queryParams.maxPrice) || 7000, // Предполагаем максимальную цену 7000
  ]);
  const [sort, setSort] = useState(queryParams.sort || "");
  const [companyUuid, setCompanyUuid] = useState(queryParams.companyUuid || "");

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
    updateQueryParam({
      key: "companyUuid",
      value: companyUuid,
      pageKey: "products",
    });
    onClose();
  };

  return (
    <section>
      <Button fullWidth variant="light" onClick={onOpen}>
        <FaFilter size={25} />
      </Button>
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
                      maxValue={7000}
                      defaultValue={[100, 7000]}
                      value={priceRange}
                      onChange={(e: any) => setPriceRange(e)}
                      className="mt-4"
                    />
                  </div>
                  <Select
                    label="Фирма поставщик-производитель"
                    placeholder="Выберите фирму"
                    labelPlacement="outside"
                    selectedKeys={new Set([companyUuid])}
                    onSelectionChange={(keys) => {
                      setCompanyUuid(Array.from(keys).join(""));
                    }}
                    fullWidth
                  >
                    {companies.map(({ uuid, name }) => (
                      <SelectItem key={uuid}>{name}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Сортировка"
                    labelPlacement="outside"
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
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setPriceRange([0, 7000]);
                    setSort("");
                    onClose();
                    window.location.reload();
                  }}
                >
                  Сбросить
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
