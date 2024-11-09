import cn from "clsx";
import { useActions } from "@hooks/useActions";
import { useEffect } from "react";
import CategoryItems from "./CategoryItems/CategoryItems";
import AdminItems from "./AdminItems/AdminItems";
import { useLocation } from "react-router-dom";
import CompanyItems from "./CompanyItems/CompanyItems";

const Sidebar = () => {
  const { getCategoriesAll } = useActions();
  const { pathname } = useLocation();

  useEffect(() => {
    getCategoriesAll();
  }, [getCategoriesAll]);

  return (
    <aside
      className={cn(
        "relative bg-white flex flex-col justify-between z-20 h-full transition-transform duration-300"
      )}
    >
      <ul>
        {pathname.startsWith("/admin") ? (
          <div className="text-xl font-bold text-wrap text-black mt-6 mb-6 ml-6">
            Админ панель
          </div>
        ) : pathname.startsWith("/company") ? (
          <div className="text-xl font-bold text-wrap text-black mt-6 mb-6 ml-6">
            Компания
          </div>
        ) : (
          <div className="text-xl font-bold text-wrap text-black mt-6 mb-6 ml-6">
            Категории
          </div>
        )}
        {pathname.startsWith("/admin") ? (
          <AdminItems />
        ) : pathname.startsWith("/company") ? (
          <CompanyItems />
        ) : (
          <CategoryItems />
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
