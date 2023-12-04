import { IReview } from "@interfaces/data-interfaces/review.interface";
import { FC } from "react";

const ProgressBar: FC<{ reviews: IReview[] }> = ({ reviews }) => {
  const countReviewsByRating = (ratingValue: number) => {
    return reviews.filter((review) => review.rating === ratingValue).length;
  };

  // Вычисление процентного соотношения для каждого рейтинга
  const totalReviews = reviews.length;
  const ratingPercentages = [5, 4, 3, 2, 1].map((ratingValue) => {
    const count = countReviewsByRating(ratingValue);
    return (count / totalReviews) * 100;
  });
  return (
    <>
      {ratingPercentages.map((percentage, index) => (
        <div className="flex flex-row items-center mb-4" key={index}>
          <div className="mr-5">{5 - index}</div>
          <div className="w-[300px] bg-[#e1e1e1] rounded-xl h-2 dark:bg-gray-700">
            <div
              className="bg-orange h-2 rounded-xl dark:bg-blue-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProgressBar;
