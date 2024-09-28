/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";
import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const slideWidth = 100;

interface ICarouselProps {
  images: string[];
}

const Carousel = ({ images }: ICarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const sliderRef = useRef<any>(null);

  const isOne = (images.length <= 1) as boolean;

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

  const handleTouchStart = (e: any) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      handleNext();
    }

    if (touchStartX - touchEndX < -50) {
      handlePrev();
    }
  };

  return (
    <div className="w-full my-8 relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out rounded-2xl"
        style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={sliderRef}
      >
        {images.map((img, index) => (
          <div
            key={img + index}
            style={{ width: `${slideWidth}%` }}
            className="flex-shrink-0 flex justify-center items-center"
          >
            <Image
              key={index}
              src={getImageUrl(img)}
              alt="..."
              className="w-full max-h-[400px] flex-shrink-0 object-cover rounded-2xl"
              style={{ width: `${slideWidth}%` }}
            />
          </div>
        ))}
      </div>

      {!isOne && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-full text-black p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
          aria-label="Предыдущее изображение"
        >
          <FaAngleLeft size={25} color="gray" />
        </button>
      )}

      {!isOne && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-full text-black p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
          aria-label="Следующее изображение"
        >
          <FaAngleRight size={25} color="gray" />
        </button>
      )}

      {!isOne && (
        <div className="flex mt-2 space-x-2 py-2 px-4 last:pl-1">
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
      )}
    </div>
  );
};

export default Carousel;
