import { useAppSelector } from "./redux-hooks/reduxHooks";

export const useCompany = () => {
  const { selectedCompanyProduct } = useAppSelector((state) => state.products);
  const { companies } = useAppSelector((state) => state.company);

  const { deliveryPrice, minimumOrderPrice, name } =
    companies?.find((item) => item.uuid === selectedCompanyProduct) || {};

  return {
    companyDeliveryPrice: deliveryPrice,
    companyMinPriceDelivery: minimumOrderPrice,
    selectedCompanyProduct,
    companyName: name,
  };
};
