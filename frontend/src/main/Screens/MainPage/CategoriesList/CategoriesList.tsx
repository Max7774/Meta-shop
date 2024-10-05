import SubcategoriesList from "@Components/SubcategoriesList/SubcategoriesList";
import { useCategory } from "@hooks/useCategory";
import SubCategorySkeleton from "@UI/Skeleton/SubCategorySkeleton/SubCategorySkeleton";
import React from "react";

const CategoriesList = () => {
  const { isLoading, categories } = useCategory();

  if (isLoading) return <SubCategorySkeleton />;

  return (
    <div className="flex flex-col gap-5 mb-4 p-2 md:p-4">
      {categories.map((category) => {
        if (category.subcategory.length === 0)
          return <React.Fragment key={category.uuid}></React.Fragment>;
        return (
          <div key={category.uuid} className="flex flex-col gap-3">
            <span className="text-base sm:text-lg md:text-xl font-bold">
              {category.name}
            </span>
            <SubcategoriesList
              subcategories={category.subcategory}
              categorySlug={category.slug}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesList;
