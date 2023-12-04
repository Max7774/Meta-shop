import { useTypedSelector } from "@hooks/redux-hooks/useTypedSelector";
import { useActions } from "@hooks/useActions";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Categories.module.scss";
import cn from "clsx";

const Categories = () => {
  const { getAllCategories } = useActions();
  const categories = useTypedSelector((state) => state.category);
  const [expandedCategories, setExpandedCategories] = useState<any>({});

  useEffect(() => {
    getAllCategories({});
  }, [getAllCategories]);

  const toggleCategory = (slug: string) => {
    // setExpandedCategories((prev: any) => ({
    //   ...prev,
    //   [slug]: !prev[slug],
    // }));
    setExpandedCategories((prev: any) => {
      const isExpanded = !prev[slug];
      const newExpanded = { ...prev, [slug]: isExpanded };

      if (isExpanded) {
        // Вычислите и примените высоту
        const content = document.getElementById(`subcategory-${slug}`);
        if (content) {
          content.style.height = `${content.scrollHeight}px`;
        }
      } else {
        // Сбросьте высоту
        const content = document.getElementById(`subcategory-${slug}`);
        if (content) {
          content.style.height = `0px`;
        }
      }

      return newExpanded;
    });
  };

  return (
    <>
      <div className="bg-gray h-[1px] mx-5"></div>
      <div className="text-3xl text-black font-semibold m-5 mb-0 tablet:text-center">
        Категории
      </div>
      <div className="flex flex-col justify-center items-center mx-5">
        {categories.categories.map((category, i) => (
          <div key={i} className="w-full flex flex-col">
            <div
              className="flex flex-row justify-between items-center w-full bg-gray rounded-lg py-2 my-2 px-5"
              onClick={() => toggleCategory(category.slug)}
            >
              <div className="text-sm text-center mt-1 text-black font-semibold">
                {category.name}
              </div>
              <div>
                {expandedCategories[category.slug] ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
            </div>
            <div
              id={`subcategory-${category.slug}`}
              className={cn(styles.subcategories, {
                [styles.filterOpened]: expandedCategories[category.slug],
              })}
            >
              {category.subcategory?.map((sub, idx) => (
                <div key={idx} className="pl-5 py-2 text-black">
                  {sub.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray h-[1px] mx-5 my-2"></div>
    </>
  );
};

export default Categories;
