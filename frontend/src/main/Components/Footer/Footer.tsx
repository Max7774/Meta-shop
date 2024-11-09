import { Logo } from "@UI/Logo/LogoIcon";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-default-white text-default-400 py-8">
      <div className="container mx-auto gap-10 flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-center flex flex-col items-center mb-4 md:mb-0">
          <h2
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Logo size="lg" />
          </h2>
        </div>
        <div>
          <span>
            Мы стремимся обеспечить наших клиентов и партнеров в сфере B2B
            качественными продуктами по лучшим ценам.
          </span>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray transition duration-200">
            Главная
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-300 transition duration-200 text-nowrap"
          >
            О нас
          </Link>
          <Link
            to="/contacts"
            className="hover:text-gray-300 transition duration-200"
          >
            Контакты
          </Link>
        </nav>
      </div>
      <div className="border-t border-default-300 mt-8 pt-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
