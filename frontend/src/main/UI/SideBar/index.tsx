import cn from "clsx";
import { Divider } from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import { useEffect } from "react";
import CategoryItems from "./CategoryItems/CategoryItems";
import AdminItems from "./AdminItems/AdminItems";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const { getCategoriesAll } = useActions();
  const { pathname } = useLocation();

  useEffect(() => {
    getCategoriesAll();
  }, []);

  return (
    <>
      <aside
        className={cn(
          "relative bg-white border-r-1 border-gray flex flex-col justify-between z-20 h-full transition-transform duration-300"
        )}
      >
        <ul>
          {pathname.startsWith("/admin") ? (
            <div className="text-xl font-bold text-wrap text-black mt-6 mb-6 ml-6">
              Админ панель
            </div>
          ) : (
            <div className="text-xl text-wrap text-black mt-6 mb-6 ml-6">
              Категории
            </div>
          )}
          <Divider className="my-4" />
          {pathname.startsWith("/admin") ? <AdminItems /> : <CategoryItems />}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
