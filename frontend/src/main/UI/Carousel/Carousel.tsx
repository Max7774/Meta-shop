import { Chip } from "@nextui-org/react";
import { useRef, useState } from "react";

// Ширина одного слайда (будем считать, что это 100%)
const slideWidth = 100;

interface ICarouselProps {
  images: string[];
  isNew: boolean;
}

const Carousel = ({ images, isNew }: ICarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const sliderRef = useRef<any>(null);

  const handlePrev = () => {
    setCurrentIndex((prevState) =>
      prevState === 0 ? images.length - 1 : prevState - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevState) =>
      prevState === images.length - 1 ? 0 : prevState + 1
    );
  };

  // Обработчик начала касания
  const handleTouchStart = (e: any) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  // Обработчик движения касания
  const handleTouchMove = (e: any) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  // Обработчик окончания касания
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Свайп влево (следующий слайд)
      handleNext();
    }

    if (touchStartX - touchEndX < -50) {
      // Свайп вправо (предыдущий слайд)
      handlePrev();
    }
  };

  return (
    <div className="w-full lg:w-1/2 my-8 relative overflow-hidden">
      {isNew && (
        <Chip
          className="absolute text-white right-2 top-2"
          color="success"
          style={{ zIndex: 999999 }}
        >
          Новый
        </Chip>
      )}
      {/* Галерея изображений */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={sliderRef}
      >
        {images.map((img, index) => (
          <>
            <img
              key={index}
              src={img}
              alt="..."
              className="w-full flex-shrink-0 border-1 border-default rounded-2xl"
              style={{ width: `${slideWidth}%` }}
            />
          </>
        ))}
      </div>

      {/* Кнопки навигации */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 h-1/2 transition-colors hover:bg-default-200 bg-transparent bg-default-50 left-2 transform -translate-y-1/2 text-[2rem] text-black p-1 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 h-1/2 transition-colors hover:bg-default-200 bg-transparent bg-default-50 right-2 transform -translate-y-1/2 text-[2rem] text-black p-1 rounded-full"
      >
        ›
      </button>

      {/* Миниатюры */}
      <div className="flex mt-2 space-x-2 py-2 px-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`... ${index}`}
            className={`w-12 h-12 object-cover rounded-md cursor-pointer ${
              currentIndex === index ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
