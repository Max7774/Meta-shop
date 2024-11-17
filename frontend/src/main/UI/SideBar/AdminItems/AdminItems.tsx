import cn from "clsx";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ADMIN_SIDEBAR_ITEMS } from "@/const/admin_items";

interface IAdminItemsProps {
  isCollapsed: boolean;
}

const AdminItems = ({ isCollapsed }: IAdminItemsProps) => {
  const { pathname } = useLocation();

  return (
    <>
      {!!ADMIN_SIDEBAR_ITEMS.find((el) => pathname.includes(el.slug)) && (
        <motion.div
          className="absolute left-0 bg-primary w-full h-12 rounded-2xl ml-3"
          initial={false}
          animate={{
            y:
              Number(
                ADMIN_SIDEBAR_ITEMS.findIndex(({ slug }) =>
                  pathname.includes(slug)
                )
              ) * 56,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div className="flex flex-col">
        {ADMIN_SIDEBAR_ITEMS.length === 0 && (
          <span className="ml-5">Категорий пока что нет!</span>
        )}
        {ADMIN_SIDEBAR_ITEMS.map(({ name, uuid, slug, Icon }) => (
          <li key={uuid} className="relative mb-2 last:mb-0">
            <Link
              key={uuid + "link"}
              className={cn(
                "whitespace-nowrap text-lg h-12 flex items-center px-10 transition-colors duration-300",
                {
                  "text-white": pathname.includes(slug),
                  "text-black rounded-l-xl hover:shadow-[inset_1px_0_0_1px_#d1d1d4] hover:transition-all hover:duration-500 hover:cursor-pointer":
                    !pathname.includes(slug),
                  "ml-0": isCollapsed,
                  "ml-3": !isCollapsed,
                }
              )}
              to={slug}
            >
              {isCollapsed ? (
                <div>
                  <Icon size={20} />
                </div>
              ) : (
                <div className="text-md">
                  <span>{name}</span>
                </div>
              )}
            </Link>
          </li>
        ))}
      </div>
    </>
  );
};

export default AdminItems;
