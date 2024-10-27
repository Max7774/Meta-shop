import cn from "clsx";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { COMPANY_SIDEBAR_ITEMS } from "@/const/company_items";

const CompanyItems = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!!COMPANY_SIDEBAR_ITEMS.find((el) => pathname.includes(el.slug)) && (
        <motion.div
          className="absolute left-0 bg-primary w-full h-12 rounded-2xl ml-3"
          initial={false}
          animate={{
            y:
              Number(
                COMPANY_SIDEBAR_ITEMS.findIndex(({ slug }) =>
                  pathname.includes(slug)
                )
              ) * 56,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div className="flex flex-col">
        {COMPANY_SIDEBAR_ITEMS.length === 0 && (
          <span className="ml-5">Категорий пока что нет!</span>
        )}
        {COMPANY_SIDEBAR_ITEMS.map(({ name, uuid, slug }) => (
          <li key={uuid} className="relative mb-2 last:mb-0">
            <Link
              key={uuid + "link"}
              className={cn(
                "whitespace-nowrap text-lg h-12 flex items-center px-10 ml-3 transition-colors duration-300",
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
      </div>
    </>
  );
};

export default CompanyItems;
