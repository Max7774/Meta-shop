import cn from "clsx";
import { FC } from "react";
import { TransitionGroup } from "react-transition-group";

import styles from "./Carousel.module.scss";
import CarouselNavigation from "./CarouselNavigation";
import { ICarouselItem } from "./carousel.interface";
import { useTypedSelector } from "@hooks/redux-hooks/useTypedSelector";
import Transition from "@UI/Transition/Transition";
import { Link } from "react-router-dom";

interface ICarousel {
  items: ICarouselItem[];
  className?: string;
}

const Carousel: FC<ICarousel> = ({ items, className = "" }) => {
  const { selectedItemIndex } = useTypedSelector((state) => state.carousel);
  const selectedItem = items[selectedItemIndex];

  return (
    <section className={cn(className, "relative m-5")}>
      <CarouselNavigation />
      <TransitionGroup className="relative h-56">
        <Transition
          key={selectedItem.title}
          timeout={500}
          classNames={{
            enter: styles["item-enter"],
            enterActive: styles["item-enter-active"],
            exit: styles["item-exit"],
            exitActive: styles["item-exit-active"],
          }}
          unmountOnExit
          mountOnEnter
        >
          <div
            className={styles.item}
            style={
              selectedItem.image
                ? {
                    backgroundImage: `url(${selectedItem.image})`,
                  }
                : {}
            }
          >
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.description}</p>
            {selectedItem.link ? (
              <Link to={selectedItem.link} className="btnlink btn-white mt-3">
                Читать далее
              </Link>
            ) : (
              <Link to="/explorer" className="btnlink btn-white mt-3">
                Посмотреть всё
              </Link>
            )}
          </div>
        </Transition>
      </TransitionGroup>
    </section>
  );
};

export default Carousel;
