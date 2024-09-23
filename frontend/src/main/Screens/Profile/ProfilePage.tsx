import Address from "@Components/Address/Address";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { Avatar, Button } from "@nextui-org/react";
import EditProfileForm from "./EditProfileForm/EditProfileForm";
import { useState } from "react";
import { getImageUrl } from "@utils/getImageUrl";

const ProfilePage = () => {
  const { profile } = useAppSelector((state) => state.user);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditOpen = () => setIsEditOpen(true);
  const handleEditClose = () => setIsEditOpen(false);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
        <Avatar
          src={getImageUrl(profile.avatarPath)}
          alt={profile.first_name}
          size="lg"
          className="mb-4 md:mb-0"
        />
        <div className="flex w-full flex-col space-y-2">
          <h1 className="text-2xl font-bold">{profile.first_name}</h1>
          <h1 className="text-2xl font-bold">{profile.second_name}</h1>
          <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
            Email: {`${profile.email}` || "Почты нет"}
          </p>
          <p>Телефон: {profile.phone_number}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Address />
            <Button
              className="sm:flex"
              size="lg"
              color="primary"
              onClick={handleEditOpen}
            >
              Редактировать профиль
            </Button>
          </div>
        </div>
      </div>
      <EditProfileForm isOpen={isEditOpen} onClose={handleEditClose} />
    </div>
  );
};

export default ProfilePage;
