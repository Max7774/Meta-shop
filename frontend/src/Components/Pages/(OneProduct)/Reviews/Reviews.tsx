import { Heading } from "@UI/index";
import { IReview } from "@interfaces/data-interfaces/review.interface";
import { FC } from "react";
import Review from "./Review/Review";
import { Rating } from "react-simple-star-rating";
import { RiErrorWarningFill } from "react-icons/ri";
import ProgressBar from "./ProgressBar/ProgressBar";

const Reviews: FC<{ reviews: IReview[] }> = ({ reviews }) => {
  const averageReview =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  return (
    <>
      <Heading className="mx-5 mt-10">Отзывы</Heading>
      <div className="flex flex-col tablet:flex-row items-start tablet:items-center mx-5 my-2">
        <RiErrorWarningFill className="mr-2 text-gray" size={30} />
        <div className="text-gray">
          Отзывы могут оставлять только те, кто купил товар. Так мы формируем
          честный рейтинг.
        </div>
      </div>
      {reviews.length === 0 ? (
        <>
          <div className="mx-5 my-10 text-gray">Отзывов нет</div>
        </>
      ) : (
        <>
          <div className="mx-5">
            <div className="flex flex-row items-center">
              <Rating
                readonly
                initialValue={averageReview}
                SVGstyle={{
                  display: "inline-block",
                }}
                size={40}
                allowFraction
                transition
              />
              <div className="ml-4 text-2xl text-orange">{`${averageReview} / 5`}</div>
            </div>
            <ProgressBar reviews={reviews} />
          </div>
          <div className="flex flex-col justify-between">
            {reviews.map((review, i) => (
              <Review key={i} review={review} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Reviews;
