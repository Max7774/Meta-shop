import { useTypedSelector } from "@hooks/redux-hooks/useTypedSelector";
import { useActions } from "@hooks/useActions";
import { useEffect } from "react";
import Box from "./Box";

const Categories = () => {
  const { getAllCategories } = useActions();
  const categories = useTypedSelector((state) => state.category);

  useEffect(() => {
    getAllCategories({});
  }, [getAllCategories]);
  return (
    <div className="m-5 flex flex-row flex-wrap gap-10">
      {categories.categories.map((el, i) => (
        <Box key={i}>{el.name}</Box>
      ))}
    </div>
  );
};

export default Categories;
