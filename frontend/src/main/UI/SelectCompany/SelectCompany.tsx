import { TCompany } from "@/types/TCompany";
import { Select, SelectItem } from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useEffect } from "react";
import { useCart } from "@hooks/useCart";

interface ISelectCompanyProps {
  company: TCompany[];
}

const SelectCompany = ({ company: companies }: ISelectCompanyProps) => {
  const { getAllCompanyProducts } = useActions();
  const { items } = useCart();
  const { selectedCompanyProduct } = useAppSelector((state) => state.products);
  const { companyUuid } = useAppSelector((state) => state.user.profile);

  const { selectCompanyProduct } = useActions();

  useEffect(() => {
    getAllCompanyProducts();
  }, [getAllCompanyProducts]);

  return (
    <div className="w-full">
      <Select
        items={companies}
        variant="bordered"
        size="md"
        aria-label="Выберите фирму"
        className="items-center"
        defaultSelectedKeys=""
        startContent={<span className="text-sm font-bold">Фирма:</span>}
        placeholder="Выберите фирму"
        selectedKeys={[selectedCompanyProduct]}
        fullWidth
        isDisabled={
          !!companyUuid || companies?.length <= 0 || items.length !== 0
        }
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys)[0] as string;
          if (companies.some((company) => company.uuid === selectedKey)) {
            selectCompanyProduct({ uuid: selectedKey });
          }
        }}
        classNames={{
          innerWrapper: "items-canter",
        }}
        renderValue={(items) => {
          const { uuid, name } = items[0].data as TCompany;
          return (
            <span key={uuid} className="text-black">
              {name}
            </span>
          );
        }}
      >
        {({ uuid, name }) => (
          <SelectItem textValue={name} key={uuid} value={uuid}>
            <span className="text-black">{name}</span>
          </SelectItem>
        )}
      </Select>
    </div>
  );
};

export default SelectCompany;
