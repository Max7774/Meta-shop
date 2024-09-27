/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";
import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// Ширина одного слайда (будем считать, что это 100%)
const slideWidth = 100;

interface ICarouselProps {
  images: string[];
}

const Carousel = ({ images }: ICarouselProps) => {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   arrows: true,
  //   nextArrow: <FaAngleRight size={25} color="gray" />,
  //   prevArrow: <FaAngleLeft size={25} color="gray" />,
  // };

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
    <div className="w-full my-8 relative overflow-hidden">
      {/* Галерея изображений */}
      <div
        className="flex transition-transform duration-500 ease-in-out rounded-2xl"
        style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={sliderRef}
      >
        {/* <Image
          src={getImageUrl(images[currentIndex])}
          alt="..."
          className="w-full max-h-[400px] flex-shrink-0 border-1 border-default rounded-2xl"
          style={{ width: `${slideWidth}%` }}
        /> */}
        {images.map((img, index) => (
          <div
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

    // <div className="w-full lg:w-1/2 my-8 relative overflow-hidden">
    //   <div className="absolute flex flex-col top-2 right-2 items-end gap-1 z-20">
    //     {discount !== 0 && (
    //       <Chip color="danger" className="text-white">
    //         Скидка {discount}%
    //       </Chip>
    //     )}
    //     {isNew && (
    //       <Chip color="success" className="text-white">
    //         Новый
    //       </Chip>
    //     )}
    //   </div>
    //   <Slider {...settings}>
    //     {images.map((img, index) => (
    //       <div key={index}>
    //         <Image
    //           src={getImageUrl(img)}
    //           alt={`Slide ${index + 1}`}
    //           className="w-full h-72 object-cover rounded-2xl"
    //         />
    //       </div>
    //     ))}
    //   </Slider>
    // </div>
  );
};

export default Carousel;
