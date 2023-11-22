import Carousel from "@UI/Carousel/Carousel";
import { carouselItems } from "./items";
import Categories from "./Categories/Categories";

const Main = () => {
  return (
    <div>
      <Carousel items={carouselItems} />
      <Categories />
    </div>
  );
};

export default Main;
