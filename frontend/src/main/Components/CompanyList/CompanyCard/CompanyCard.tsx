import { TCompany } from "@/types/TCompany";
import { useActions } from "@hooks/useActions";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useState } from "react";

interface ICompanyCardProps {
  company: TCompany;
}

const CompanyCard = ({ company }: ICompanyCardProps) => {
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const { deleteCompany } = useActions();

  const deleteCompanyHandler = () => {
    setIsLocalLoading(true);
    deleteCompany({ uuid: company.uuid, userUuid: company.users[0].uuid });
    setIsLocalLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="justify-between">
        <div className="text-lg font-bold">{company.officialName}</div>
        <Button
          color="primary"
          size="sm"
          isLoading={isLocalLoading}
          onClick={deleteCompanyHandler}
        >
          Удалить фирму
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small">
        <p>Uuid: {company.uuid}</p>
        <p>Email: {company.email}</p>
        <span className="pt-2">Телефон: {company.phoneNumber}</span>
        <span className="pt-2">Адрес: {company.address}</span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="text-small">Зарегистрирован:</p>
          <p className="font-semibold text-small">
            {new Date(company.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
