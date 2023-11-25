import Carousel from "@UI/Carousel/Carousel";
import { carouselItems } from "./items";
import Categories from "./Categories/Categories";
import Products from "./Products/Products";
import { Button, Footer } from "@UI/index";

const Main = () => {
  return (
    <>
      <div>
        <Carousel items={carouselItems} />
        <Categories />
        <Products />
        <div className="flex justify-center">
          <Button variant="primary" size="md">
            Больше
          </Button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
