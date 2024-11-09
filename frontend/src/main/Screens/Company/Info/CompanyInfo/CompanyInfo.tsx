import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { Avatar, CircularProgress } from "@nextui-org/react";
import { convertPrice } from "@utils/convertPrice";
import { getImageUrl } from "@utils/getImageUrl";
import { useEffect } from "react";

const CompanyInfo = () => {
  const { getCompanyInfo } = useActions();
  const { isLoading, info } = useAppSelector((state) => state.company);

  useEffect(() => {
    getCompanyInfo();
  }, [getCompanyInfo]);

  if (isLoading) return <CircularProgress />;

  return (
    <div className="max-w-4xl p-6 mb-3 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        <Avatar src={getImageUrl(info?.logoPath)} size="lg" />
        <h1 className="ml-4 text-2xl font-semibold">{info.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-500">
            Официальное название
          </p>
          <p className="text-lg">{info.officialName}</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-500">Номер регистрации</p>
          <p className="text-lg">{info.registrationNumber}</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-500">Адрес</p>
          <p className="text-lg">{info.address}</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-500">Телефон</p>
          <p className="text-lg">{info.phoneNumber}</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-lg">{info.email}</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-500">Доставка</p>
          <p className="text-lg">{convertPrice(info.deliveryPrice)}</p>
        </div>
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-500">
            Минимальная сумма заказа
          </p>
          <p className="text-lg">{convertPrice(info.minimumOrderPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
