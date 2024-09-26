import { TAdminUser } from "@/types/TUser";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";
import { useState } from "react";

interface IUserItemProps {
  user: TAdminUser;
}

const UserItem = ({ user }: IUserItemProps) => {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={getImageUrl(user.avatarPath)}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {user.first_name} {user.second_name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {user.role}
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : ""
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>Email: {user.email}</p>
        <p>Uuid: {user.uuid}</p>
        <span className="pt-2">{user.phone_number}</span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="text-default-400 text-small">Заказов</p>
          <p className="font-semibold text-default-400 text-small">
            {user.orders.length}
          </p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserItem;
