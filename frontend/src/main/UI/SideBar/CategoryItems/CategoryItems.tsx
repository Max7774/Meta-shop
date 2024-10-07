import BlockSkeleton from "@UI/Skeleton/BlockSkeleton/BlockSkeleton";
import { useCategory } from "@hooks/useCategory";
import { Link, useLocation, useParams } from "react-router-dom";
import cn from "clsx";
import { motion } from "framer-motion";
import { sideBarItems } from "./utils/sidebarItems";

const CategoryItems = () => {
  const { categories, isLoading } = useCategory();
  const { categorySlug } = useParams();
  const { pathname } = useLocation();

  return (
    <>
      {!!categories.find((el) => categorySlug === el.slug) && (
        <motion.div
          className="absolute left-0 bg-primary w-full h-12 rounded-2xl ml-3"
          initial={false}
          animate={{
            y:
              Number(
                categories.findIndex(({ slug }) => categorySlug === slug)
              ) * 56,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      {isLoading ? (
        <BlockSkeleton />
      ) : (
        <div className="flex flex-col">
          {categories.map(({ name, uuid, slug }) => (
            <li key={uuid} className="relative mb-2 last:mb-0">
              <Link
                key={uuid + "link"}
                className={cn(
                  "whitespace-nowrap text-lg h-12 flex items-center px-10 ml-3 transition-colors duration-300",
                  {
                    "text-white": categorySlug === slug,
                    "text-black rounded-l-xl hover:shadow-[inset_1px_0_0_1px_#d1d1d4] hover:transition-all hover:duration-500 hover:cursor-pointer":
                      categorySlug !== slug,
                  }
                )}
                to={`/categories/${slug}`}
              >
                <div className="text-md">
                  <span>{name}</span>
                </div>
              </Link>
            </li>
          ))}
        </div>
      )}
      <div className="mt-3">
        {!!sideBarItems.find((el) => pathname === el.slug) && (
          <motion.div
            className="absolute left-0 bg-primary w-full h-12 rounded-2xl ml-3"
            initial={false}
            animate={{
              y:
                Number(
                  sideBarItems.findIndex(({ slug }) => pathname === slug)
                ) * 56,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <div className="flex flex-col">
          {sideBarItems.map(({ name, uuid, slug }) => (
            <li key={uuid} className="relative mb-2 last:mb-0">
              <Link
                key={uuid + "link"}
                className={cn(
                  "whitespace-nowrap text-lg h-12 flex items-center px-10 ml-3 transition-colors duration-300",
                  {
                    "text-white": pathname === slug,
                    "text-black rounded-l-xl hover:shadow-[inset_1px_0_0_1px_#d1d1d4] hover:transition-all hover:duration-500 hover:cursor-pointer":
                      pathname !== slug,
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
      </div>
    </>
  );
};

export default CategoryItems;
