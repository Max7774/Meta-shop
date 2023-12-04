import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const FavoriteButton: FC<{ productUuid: string }> = ({ productUuid }) => {
  const profile = useAppSelector((store) => store.profile);

  if (!profile) return null;

  const isExists = profile.profile.favorites.some(
    (favorite) => favorite.uuid === productUuid
  );

  return (
    <div>
      <button className="text-primary">
        {isExists ? <AiFillHeart size={30} /> : <AiOutlineHeart size={30} />}
      </button>
    </div>
  );
};

export default FavoriteButton;
