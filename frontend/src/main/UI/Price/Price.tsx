import { TCompanyProduct } from "@/types/TCompany";
import { Badge, Select, SelectItem } from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import PriceView from "./PriceView/PriceView";

interface IPriceProps {
  company: TCompanyProduct[];
  unitofmeasurement: string;
}

const Price = ({ company: companies, unitofmeasurement }: IPriceProps) => {
  const selectedCompanyProduct = useAppSelector(
    (state) => state.products.selectedCompanyProduct
  );

  const { setSelectedProduct, updateSelectedCompanyProduct } = useActions();

  const companyDiscount = companies.find(
    (el) => el.uuid === selectedCompanyProduct.uuid
  );

  return (
    <div className="w-full">
      <Badge
        className="px-2"
        classNames={{ base: "w-full" }}
        content={
          companyDiscount?.discount
            ? `Скидка ${companyDiscount.discount}%`
            : undefined
        }
        shape="circle"
        color="danger"
      >
        <Select
          items={companies}
          label="Цена от фирм"
          variant="bordered"
          placeholder="Цен не проставлено"
          selectedKeys={[selectedCompanyProduct.uuid]}
          fullWidth
          isDisabled={companies?.length <= 0}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string;
            setSelectedProduct({ uuid: selectedKey });
            updateSelectedCompanyProduct({ uuid: selectedKey });
          }}
          classNames={{
            trigger: "h-13",
          }}
          renderValue={(items) => {
            const {
              uuid,
              price,
              discount,
              company: { name },
            } = items[0].data as TCompanyProduct;
            return (
              <PriceView
                key={uuid}
                price={price}
                name={name}
                discount={discount}
                unitofmeasurement={unitofmeasurement}
              />
            );
          }}
        >
          {({ uuid, price, discount, company: { name } }) => (
            <SelectItem textValue="" key={uuid}>
              <PriceView
                price={price}
                name={name}
                discount={discount}
                unitofmeasurement={unitofmeasurement}
              />
            </SelectItem>
          )}
        </Select>
      </Badge>
    </div>
  );
};

export default Price;
