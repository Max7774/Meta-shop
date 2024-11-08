/* eslint-disable @typescript-eslint/no-explicit-any */
import { A11y, Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Button, Image } from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";
import { TSwiperData } from "@/types/TSwiperData";
import { useNavigate } from "react-router-dom";

interface ISwiperUIProps {
  images: TSwiperData[];
}

function customPagination(_: any, className: string) {
  return `<span class="${className} w-4 h-4 [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:[background:bg-primary] !opacity-50 ![background:bg-default-400]"></span>`;
}

const SwiperUI = ({ images }: ISwiperUIProps) => {
  const navigate = useNavigate();

  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        pagination={{
          enabled: true,
          clickable: true,
          dynamicBullets: true,
          renderBullet: customPagination,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        scrollbar={{ draggable: true }}
        className="thumbShow"
      >
        {images.map(
          (
            { image, title, text, buttonText, buttonLink, textColor },
            index
          ) => (
            <SwiperSlide
              style={{ display: "flex", justifyContent: "center" }}
              key={image + index}
              className="select-none"
            >
              <div className="relative">
                <div className="absolute z-20 p-4">
                  <div className="flex flex-col gap-2">
                    {title && (
                      <span className={`text-lg font-bold text-${textColor}`}>
                        {title}
                      </span>
                    )}
                    {text && (
                      <span className={`text-md text-${textColor}`}>
                        {text}
                      </span>
                    )}
                  </div>
                </div>
                <Image
                  src={image.startsWith("/images") ? image : getImageUrl(image)}
                  className="h-[28rem] w-full object-cover"
                />
                {buttonText && (
                  <div className="absolute z-20 bottom-4 right-4">
                    <Button
                      size="lg"
                      color="primary"
                      onClick={() => buttonLink && navigate(buttonLink)}
                    >
                      {buttonText}
                    </Button>
                  </div>
                )}
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </section>
  );
};

export default SwiperUI;
