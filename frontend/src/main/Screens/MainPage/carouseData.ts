import { TSwiperData } from "@/types/TSwiperData";

export const carouselData: TSwiperData[] = [
  {
    image: "/images/gradient-5.jpg",
    title: "Свежие продукты от фермеров — прямо к вашему столу",
    text: "Заказывайте свежие и качественные продукты прямо от фермеров. Натуральные продукты без посредников.",
    textColor: "black",
    buttonText: "Заказать",
    buttonLink: "/categories",
  },
  {
    image: "/images/gradient-6.jpg",
    title: "Вы поставщик?",
    textColor: "black",
    text: "Получите возможность продавать свои продукты вместе с нами.",
    buttonText: "Оставить заявку",
    buttonLink: "/claim",
  },
  {
    image: "/images/gradient-3.jpg",
    title: "Занимаетесь оптовой закупкой?",
    textColor: "white",
    text: "Заказывайте свежие и качественные продукты оптом.",
    buttonText: "Оставить заявку",
    buttonLink: "/claim",
  },
];
