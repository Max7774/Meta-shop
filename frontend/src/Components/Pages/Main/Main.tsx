import Categories from "./Categories/Categories";
import Products from "./Products/Products";
import { Button, Footer } from "@UI/index";
import SwiperCarousel from "./Swiper/Swiper";

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
        <Footer />
      </div>
    </>
  );
};

export default Main;
