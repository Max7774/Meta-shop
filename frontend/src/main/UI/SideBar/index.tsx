import cn from "clsx";
import { useActions } from "@hooks/useActions";
import { useEffect, useState } from "react";
import CategoryItems from "./CategoryItems/CategoryItems";
import AdminItems from "./AdminItems/AdminItems";
import { useLocation } from "react-router-dom";
import CompanyItems from "./CompanyItems/CompanyItems";
import { FaChartPie, FaBuilding, FaListAlt } from "react-icons/fa";
import ToggleButton from "@UI/ToggleButton/ToggleButton";

const Sidebar = () => {
  const { getCategoriesAll } = useActions();
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    getCategoriesAll();
  }, [getCategoriesAll]);

  return (
    <aside
      className={cn(
        "relative bg-white flex flex-col justify-between z-20 h-full transition-all duration-400",
        { "w-64": !isCollapsed, "w-20": isCollapsed }
      )}
    >
      <ToggleButton toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
      <ul>
        {pathname.startsWith("/admin") ? (
          <li className="flex items-center mt-6 mb-6 ml-6">
            <FaChartPie className="mr-3" />
            {!isCollapsed && (
              <span className="text-xl font-bold text-black">Админ панель</span>
            )}
          </li>
        ) : pathname.startsWith("/company") ? (
          <li className="flex items-center mt-6 mb-6 ml-6">
            <FaBuilding className="mr-3" />
            {!isCollapsed && (
              <span className="text-xl font-bold text-black">Компания</span>
            )}
          </li>
        ) : (
          <li className="flex flex-nowrap items-center mt-6 mb-6 ml-6">
            <FaListAlt className="mr-3" />
            <span
              className={cn(
                "text-xl font-bold text-black transition-all duration-200",
                {
                  "opacity-0": isCollapsed,
                  "opacity-1": !isCollapsed,
                }
              )}
            >
              Категории
            </span>
          </li>
        )}

        {pathname.startsWith("/admin") ? (
          <AdminItems isCollapsed={isCollapsed} />
        ) : pathname.startsWith("/company") ? (
          <CompanyItems isCollapsed={isCollapsed} />
        ) : (
          <CategoryItems isCollapsed={isCollapsed} />
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
