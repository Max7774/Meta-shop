import BlockSkeleton from "@UI/Skeleton/BlockSkeleton/BlockSkeleton";
import { useCategory } from "@hooks/useCategory";
import { Link, useParams } from "react-router-dom";
import cn from "clsx";
import { motion } from "framer-motion";

const CategoryItems = () => {
  const { categories, isLoading } = useCategory();
  const { categorySlug } = useParams();

  return (
    <>
      {!!categories.find((el) => categorySlug === el.slug) && (
        <motion.div
          className="absolute left-0 bg-primary w-full py-6 rounded-2xl ml-3"
          initial={false}
          animate={{
            y:
              Number(
                categories.findIndex(({ slug }) => categorySlug === slug)
              ) * 57,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      {isLoading ? (
        <BlockSkeleton />
      ) : (
        <>
          {categories.length === 0 && (
            <span className="ml-5">Категорий пока что нет!</span>
          )}
          {categories.map(({ name, uuid, slug }) => (
            <li key={uuid} className="relative">
              <Link
                key={uuid + "link"}
                className={cn(
                  "whitespace-nowrap block text-lg py-2 my-3 px-10 ml-3 transition-colors duration-300",
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
        </>
      )}
    </>
  );
};

export default CategoryItems;
