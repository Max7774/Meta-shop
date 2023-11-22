import { FC } from "react";
import { BsCaretLeftSquare, BsCaretRightSquare } from "react-icons/bs";

import styles from "./Carousel.module.scss";
import { useActions } from "@hooks/useActions";

const CarouselNavigation: FC = () => {
  const { nextSlide, prevSlide } = useActions();

  return (
    <div className={styles.nav}>
      <button onClick={() => prevSlide()}>
        <BsCaretLeftSquare />
      </button>
      <button onClick={() => nextSlide({ carouselLength: 3 })}>
        <BsCaretRightSquare />
      </button>
    </div>
  );
};

export default CarouselNavigation;
