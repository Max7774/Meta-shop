import { FC, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import cn from "clsx";
import styles from "./Carousel.module.scss";
import CarouselNavigation from "./Navigation";

const Carousel: FC<{ images: string[]; isNew: boolean }> = ({
  images,
  isNew,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mx-5 mt-5 relative">
      {isNew && (
        <>
          <div className={styles["flag"]}>
            <div className={styles["triangle"]}>
              <FaCaretRight size={50} />
            </div>
            <div>Новое!</div>
          </div>
        </>
      )}
      <div>
        <img
          src={images[activeIndex]}
          alt="..."
          width={500}
          height={500}
          className="rounded-lg overflow-hidden"
        />
        <CarouselNavigation
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          images={images}
        />
      </div>
      <div
        className="mt-6 rounded-md p-2 overflow-auto"
        style={{ maxWidth: 500, overflowX: "auto", whiteSpace: "nowrap" }}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(styles["image"], {
              "shadow-md border-primary": index === activeIndex,
              "border-transparent": index !== activeIndex,
            })}
          >
            <img
              draggable={false}
              src={image}
              alt="..."
              width={100}
              height={100}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
