import { FC } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import styles from "./Carousel.module.scss";
import { useActions } from "@hooks/useActions";
import { ICarouselItem } from "./carousel.interface";

interface ICarouselNavigationProps {
  items: ICarouselItem[];
}

const CarouselNavigation: FC<ICarouselNavigationProps> = ({ items }) => {
  const { nextSlide, prevSlide } = useActions();

  return (
    <>
      <div className={styles["nav-right"]}>
        <button onClick={() => nextSlide({ carouselLength: 3 })}>
          <BsChevronCompactRight size={40} />
        </button>
      </div>
      <div className={styles["nav-left"]}>
        <button onClick={() => prevSlide()}>
          <BsChevronCompactLeft size={40} />
        </button>
      </div>
    </>
  );
};

export default CarouselNavigation;
