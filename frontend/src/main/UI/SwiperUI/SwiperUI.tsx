import { Button } from "@nextui-org/react";
import { TSwiperData } from "@/types/TSwiperData";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import clsx from "clsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "@utils/getImageUrl";

interface ISwiperUIProps {
  images: TSwiperData[];
}

const SwiperUI = ({ images }: ISwiperUIProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % images?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  React.useEffect(() => {
    if (!paused && images?.length > 1) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, paused, images?.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.x;

    if (offset < -100) {
      paginate(1);
    } else if (offset > 100) {
      paginate(-1);
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={images[currentSlide]?.image}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            dragElastic={1}
            drag={images?.length > 1 ? "x" : false}
            onDragEnd={images?.length > 1 ? handleDragEnd : undefined}
            className="absolute w-full h-full cursor-grab active:cursor-grabbing rounded-2xl"
            style={{ touchAction: "pan-y" }}
          >
            <motion.img
              key={images[currentSlide]?.image}
              src={
                images[currentSlide]?.image.startsWith("/images")
                  ? images[currentSlide]?.image
                  : getImageUrl(images[currentSlide]?.image)
              }
              alt={images[currentSlide]?.title || ""}
              className="absolute w-full h-full object-cover rounded-2xl"
            />
            <div
              className={clsx(
                "absolute inset-0 flex flex-col justify-between items-center text-center p-4",
                {
                  "bg-black bg-opacity-30": !!images[currentSlide]?.title,
                }
              )}
            >
              <div>
                {images[currentSlide]?.title && (
                  <h2
                    className={clsx(
                      "text-3xl md:text-5xl font-bold mb-2",
                      images[currentSlide]?.textColor === "white"
                        ? "text-white"
                        : "text-black"
                    )}
                  >
                    {images[currentSlide]?.title}
                  </h2>
                )}
                {images[currentSlide]?.text && (
                  <p
                    className={clsx(
                      "text-lg md:text-2xl mb-4",
                      images[currentSlide]?.textColor === "white"
                        ? "text-white"
                        : "text-black"
                    )}
                  >
                    {images[currentSlide]?.text}
                  </p>
                )}
              </div>
              <div className="self-start">
                {images[currentSlide]?.buttonText &&
                  images[currentSlide]?.buttonLink && (
                    <Button
                      size="md"
                      color="primary"
                      onClick={() => navigate(images[currentSlide].buttonLink!)}
                    >
                      {images[currentSlide]?.buttonText}
                    </Button>
                  )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {!!images[currentSlide]?.title && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
      {images?.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images?.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setDirection(index > currentSlide ? 1 : -1);
              }}
              className={clsx(
                "w-2 h-2 rounded-full focus:outline-none",
                currentSlide === index ? "bg-primary" : "bg-default-200"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SwiperUI;
