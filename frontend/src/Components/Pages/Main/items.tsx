import { ICarouselItem } from "@UI/Carousel/carousel.interface";

export const carouselItems: ICarouselItem[] = [
  {
    title: "Бесплатная доскавка!",
    description: "Не пропустите новые поступления лонгбордов!",
    image: "/img/1.jpg1",
  },
  {
    title: "Акции",
    description: "Каждый месяц новые акции!",
    image: "/img/2.jpg1",
  },
  {
    title: "Контесты",
    description: "Каждый год новые контесты!",
    image: "/img/3.jpg1",
    link: "Hello",
  },
  {
    title: "Реклама",
    description: "Каждый год новые контесты!",
    image: "/img/3.jpg1",
    link: "Hello",
  },
];

export const ReactItems = (): JSX.Element[] => {
  return carouselItems.map((item) => (
    <div className="py-10 mx-20">{item.title}</div>
  ));
};
