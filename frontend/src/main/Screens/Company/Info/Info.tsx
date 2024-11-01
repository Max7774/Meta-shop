import Heading from "@UI/Heading";
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import EditCompany from "./EditCompany/EditCompany";
import CompanyUsers from "./CompanyUsers/CompanyUsers";

const Info = () => {
  return (
    <section>
      <Heading>Информация о компании </Heading>
      <CompanyInfo />
      <EditCompany />
      <Heading className="mt-4">Пользователи</Heading>
      <CompanyUsers />
    </section>
  );
};

export default Info;
