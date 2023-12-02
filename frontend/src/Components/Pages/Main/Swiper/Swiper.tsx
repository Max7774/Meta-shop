import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./styles.css";

import slide_image_1 from "./assets/iphone_img.jpg";
import slide_image_2 from "./assets/airpods_img.jpg";
import slide_image_3 from "./assets/applewatch_img.jpg";
import slide_image_4 from "./assets/macbook_img.jpg";
import slide_image_5 from "./assets/iphone_case_img.jpg";
import slide_image_6 from "./assets/airtag_img.jpg";
import slide_image_7 from "./assets/imac_img.jpg";

const SwiperCarousel = () => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        // clickable: true,
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="swiper_container"
    >
      <SwiperSlide>
        <img src={slide_image_1} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_2} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_3} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_4} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_5} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_6} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_7} alt="slide_image" />
      </SwiperSlide>
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <FaChevronLeft size={25} />
        </div>
        <div className="swiper-button-next slider-arrow">
          <FaChevronRight size={25} />
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
};

export default SwiperCarousel;
