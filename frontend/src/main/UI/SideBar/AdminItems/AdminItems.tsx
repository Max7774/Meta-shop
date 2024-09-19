import cn from "clsx";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ADMIN_SIDEBAR_ITEMS } from "@/const/admin_items";

const AdminItems = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!!ADMIN_SIDEBAR_ITEMS.find((el) => pathname.includes(el.slug)) && (
        <motion.div
          className="absolute left-0 bg-primary w-full py-6 rounded-2xl ml-3"
          initial={false}
          animate={{
            y:
              Number(
                ADMIN_SIDEBAR_ITEMS.findIndex(({ slug }) =>
                  pathname.includes(slug)
                )
              ) * 57,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <>
        {ADMIN_SIDEBAR_ITEMS.length === 0 && (
          <span className="ml-5">Категорий пока что нет!</span>
        )}
        {ADMIN_SIDEBAR_ITEMS.map(({ name, uuid, slug }) => (
          <li key={uuid} className="relative">
            <Link
              key={uuid + "link"}
              className={cn(
                "whitespace-nowrap block text-lg py-2 my-3 px-10 ml-3 transition-colors duration-300",
                {
                  "text-white": pathname.includes(slug),
                  "text-black rounded-l-xl hover:shadow-[inset_1px_0_0_1px_#d1d1d4] hover:transition-all hover:duration-500 hover:cursor-pointer":
                    !pathname.includes(slug),
                }
              )}
              to={slug}
            >
              <div className="text-md">
                <span>{name}</span>
              </div>
            </Link>
          </li>
        ))}
      </>
    </>
  );
};

export default AdminItems;
