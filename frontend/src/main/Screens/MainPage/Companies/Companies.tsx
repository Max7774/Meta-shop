import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Heading from "@UI/Heading";
import SubCategorySkeleton from "@UI/Skeleton/SubCategorySkeleton/SubCategorySkeleton";
import { getImageUrl } from "@utils/getImageUrl";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const { getAllCompanies, selectCompanyProduct } = useActions();

  const navigate = useNavigate();

  const { companies, isLoading } = useAppSelector((state) => state.company);

  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);

  if (isLoading) return <SubCategorySkeleton />;

  return (
    <>
      <Heading>Компании</Heading>
      <div className="flex flex-wrap justify-around sm:justify-start gap-5">
        {companies.map((company) => {
          return (
            <Card
              shadow="sm"
              key={company.uuid}
              isPressable
              onPress={() => {
                selectCompanyProduct({ uuid: company.uuid });
                navigate("/categories");
              }}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="300px"
                  alt={company.name}
                  className="w-full object-cover h-[140px]"
                  src={getImageUrl(company.logoPath)}
                />
              </CardBody>
              <CardFooter className="text-small justify-center">
                <b>{company.name}</b>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Companies;
