import { PiFarmFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-default-white text-default-400 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-center flex flex-col items-center mb-4 md:mb-0">
          <h2 className="text-xl font-bold">
            <PiFarmFill size={35} />
          </h2>
          <p className="mt-1">Свежие продукты от фермеров</p>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray transition duration-200">
            Главная
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-300 transition duration-200"
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
