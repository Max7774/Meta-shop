import Categories from "./Categories/Categories";
import Products from "./Products/Products";
import { Button, SwiperCarousel } from "@UI/index";

const Main = () => {
  return (
    <>
      <div>
        <SwiperCarousel />
        <Categories />
        <Products />
        <div className="flex justify-center">
          <Button variant="primary" size="md">
            Больше
          </Button>
        </div>
      </div>
    </>
  );
};

export default Main;
