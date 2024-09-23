import { Chip, Image } from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";
import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// Ширина одного слайда (будем считать, что это 100%)
const slideWidth = 100;

interface ICarouselProps {
  images: string[];
  isNew?: boolean;
  discount?: number;
}

const Carousel = ({ images, discount, isNew }: ICarouselProps) => {
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
      <div className="absolute flex flex-col top-2 right-2 items-end gap-1">
        {discount !== 0 && (
          <Chip className="text-white " color="danger" style={{ zIndex: 20 }}>
            Скидка {discount}%
          </Chip>
        )}
        {isNew && (
          <Chip className="text-white" color="success" style={{ zIndex: 20 }}>
            Новый
          </Chip>
        )}
      </div>
      {/* Галерея изображений */}
      <div
        className="flex transition-transform duration-500 ease-in-out rounded-2xl"
        style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={sliderRef}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={getImageUrl(img)}
            alt="..."
            className="w-full flex-shrink-0 border-1 border-default rounded-2xl"
            style={{ width: `${slideWidth}%` }}
          />
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-full text-black p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
        aria-label="Предыдущее изображение"
      >
        <FaAngleLeft size={25} color="gray" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-full text-black p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
        aria-label="Следующее изображение"
      >
        <FaAngleRight size={25} color="gray" />
      </button>

      <div className="flex mt-2 space-x-2 py-2 px-4">
        {images.map((img, index) => (
          <Image
            key={index}
            src={getImageUrl(img)}
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
