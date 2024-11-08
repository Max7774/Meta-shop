import { useAppSelector } from "./redux-hooks/reduxHooks";

export const useCompany = () => {
  const { selectedCompanyProduct } = useAppSelector((state) => state.products);
  const { companies } = useAppSelector((state) => state.company);

  const companyDeliveryPrice = companies.find(
    (item) => item.uuid === selectedCompanyProduct
  )?.deliveryPrice;
  const companyMinPriceDelivery = companies.find(
    (item) => item.uuid === selectedCompanyProduct
  )?.minimumOrderPrice;

  return {
    companyDeliveryPrice,
    companyMinPriceDelivery,
  };
};
