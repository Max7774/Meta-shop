import { IReview } from "@interfaces/data-interfaces/review.interface";
import { FC } from "react";
import { Rating } from "react-simple-star-rating";

const Review: FC<{ review: IReview }> = ({ review }) => {
  return (
    <div className="m-5">
      <div className="bg-[#e1e1e1] p-5 flex flex-col rounded-xl">
        <div className="flex flex-row items-center">
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/file-upload/${review.user.avatarPath}`}
            alt=""
            className="rounded-full border-primary border border-solid animate-opacity bg-white"
            width={50}
            height={50}
          />
          <div className="mx-2">{review.user.first_name}</div>
          <div className="p-2 rounded-xl">
            <Rating
              readonly
              initialValue={review.rating}
              SVGstyle={{
                display: "inline-block",
              }}
              size={30}
              allowFraction
              transition
            />
          </div>
        </div>
        <div className="m-5">{review.text}</div>
      </div>
    </div>
  );
};

export default Review;
