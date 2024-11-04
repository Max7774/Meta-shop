import Address from "@Components/Address/Address";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { Avatar, Badge, Button } from "@nextui-org/react";
import EditProfileForm from "./EditProfileForm/EditProfileForm";
import { useState } from "react";
import { getImageUrl } from "@utils/getImageUrl";
import { CameraIcon } from "./Icons/Icons";
import { CheckIcon } from "./Icons/CheckIcon";
import Actions from "./Actions/Actions";

const ProfilePage = () => {
  const { profile } = useAppSelector((state) => state.user);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditOpen = () => setIsEditOpen(true);
  const handleEditClose = () => setIsEditOpen(false);

  console.log(profile);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
        <Badge
          content={profile.verified && <CheckIcon />}
          color={profile.verified ? "success" : "danger"}
        >
          <Avatar
            src={getImageUrl(profile.avatarPath)}
            alt={profile.first_name}
            className="mb-4 md:mb-0 w-40 h-40 text-large"
            showFallback={profile.avatarPath === "default-avatar.png"}
            fallback={
              <CameraIcon
                className="animate-pulse w-6 h-6 text-default-500"
                fill="currentColor"
                size={20}
              />
            }
          />
        </Badge>
        <div className="flex w-full flex-col space-y-2">
          <div className="flex flex-row justify-center gap-3">
            <h1 className="text-2xl font-bold">{profile.first_name}</h1>
            <h1 className="text-2xl font-bold">{profile.second_name}</h1>
          </div>
          <p className="w-full text-default-400 overflow-hidden text-center text-sm whitespace-nowrap text-ellipsis">
            {`${profile.email}` || "Почты нет"}
            <p>{profile.phone_number}</p>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="sm:flex"
              size="lg"
              color="primary"
              onClick={handleEditOpen}
            >
              Редактировать профиль
            </Button>
            <Address />
          </div>
        </div>
      </div>
      <div className="mt-4 w-full">
        <span className="w-full flex text-md font-bold text-default-400 mb-2">
          Действия
        </span>
        <Actions />
      </div>
      <EditProfileForm isOpen={isEditOpen} onClose={handleEditClose} />
    </div>
  );
};

export default ProfilePage;
