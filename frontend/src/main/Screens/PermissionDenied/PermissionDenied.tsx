import { Button } from "@nextui-org/react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PermissionDenied = () => {
  const navigate = useNavigate();

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
        <Button onClick={() => navigate("/")} size="lg" color="primary">
          Вернуться на главную страницу
        </Button>
      </div>
    </section>
  );
};

export default PermissionDenied;
