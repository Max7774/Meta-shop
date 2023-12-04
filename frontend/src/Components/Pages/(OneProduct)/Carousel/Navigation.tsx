import { FC } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import styles from "./Carousel.module.scss";

interface CarouselNavigationProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  images: string[];
}

const CarouselNavigation: FC<CarouselNavigationProps> = ({
  activeIndex,
  setActiveIndex,
  images,
}) => {
  const goToPrevious = () => {
    const newIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };
  return (
    <>
      <div className={styles["nav-right"]}>
        <button onClick={goToNext}>
          <BsChevronCompactRight size={40} />
        </button>
      </div>
      <div className={styles["nav-left"]}>
        <button onClick={goToPrevious}>
          <BsChevronCompactLeft size={40} />
        </button>
      </div>
    </>
  );
};

export default CarouselNavigation;
