import { Helmet } from "react-helmet-async";
import Heading from "@UI/Heading";
import CategoriesList from "./CategoriesList/CategoriesList";

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>Главная</title>
        <meta name="description" content="Главная страница - AgroZakupKz" />
      </Helmet>
      <section>
        <Heading>Добро пожаловать!</Heading>
        <CategoriesList />
      </section>
    </>
  );
};

export default MainPage;
