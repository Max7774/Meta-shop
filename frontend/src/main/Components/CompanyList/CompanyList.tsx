import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { useEffect } from "react";
import CompanyCard from "./CompanyCard/CompanyCard";
import { CircularProgress } from "@nextui-org/react";

const CompanyList = () => {
  const { getAllCompanies } = useActions();

  const { companies, isLoading } = useAppSelector((state) => state.company);

  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);

  if (isLoading) return <CircularProgress />;

  return (
    <section className="flex flex-col gap-2">
      {companies.map((company) => (
        <CompanyCard company={company} key={company.uuid} />
      ))}
    </section>
  );
};

export default CompanyList;
