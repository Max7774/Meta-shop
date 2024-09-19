import { BASE_URL } from "@/const/baseUrl";
import OrderList from "@/main/Components/OrderList/OrderList";
import { useProfile } from "@hooks/useProfile";
import { Avatar, Button } from "@nextui-org/react";

const ProfilePage = () => {
  const { profile } = useProfile();
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
        <Avatar
          src={BASE_URL + "/file-upload/" + profile.avatarPath}
          alt={profile.first_name}
          size="lg"
          className="mb-4 md:mb-0"
        />
        <div className="flex w-full flex-col space-y-2">
          <h1 className="text-2xl font-bold">{profile.first_name}</h1>
          <p>Email: {profile.email}</p>
          <p>Телефон: {profile.phone_number}</p>
          <Button color="primary">Редактировать профиль</Button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Мои заказы</h2>
        <OrderList />
      </div>
    </div>
  );
};

export default ProfilePage;
