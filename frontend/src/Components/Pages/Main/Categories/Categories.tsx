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
    <>
      <div className="bg-gray h-[1px] mx-5"></div>
      <div className="text-3xl text-black font-semibold m-5 tablet:text-center">
        Категории
      </div>
      <div className="m-5 grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-6 gap-5 tablet:gap-20">
        {categories.categories.map((el, i) => (
          <div
            key={i + "block"}
            className="flex flex-col justify-center items-center"
          >
            <Box key={i}>
              <img src={el.icon} alt="..." width={130} height={130} />
            </Box>
            <div
              key={i + "name"}
              className="text-sm text-center mt-1 hidden tablet:block text-black font-semibold"
            >
              {el.name}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray h-[1px] mx-5"></div>
    </>
  );
};

export default Categories;
