import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const PermissionDenied = () => {
  return (
    <section className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <div className="flex flex-row items-center justify-center gap-5 mb-5">
          <h1 className="text-[1.5rem] font-bold text-red-500">
            У вас нет доступа
          </h1>
          <FaLock size={35} className="text-red-500" />
        </div>
        <p className="text-gray-600 mb-8">
          К сожалению, у вас нет прав для доступа к этой странице.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white py-3 px-6 rounded-2xl hover:bg-blue-600 transition-colors duration-200"
        >
          Вернуться на главную страницу
        </Link>
      </div>
    </section>
  );
};

export default PermissionDenied;
