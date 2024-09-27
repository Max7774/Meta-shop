import { TAdminUser } from "@/types/TUser";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";

interface IUserItemProps {
  user: TAdminUser;
}

const UserItem = ({ user }: IUserItemProps) => {
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
      </CardHeader>
      <CardBody className="px-3 py-0 text-small">
        <p>Uuid: {user.uuid}</p>
        <p>Email: {user.email}</p>
        <span className="pt-2">Телефон: {user.phone_number}</span>
        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Адреса пользователя"
            title="Адреcа пользователя"
          >
            <div className="flex flex-col gap-3">
              {user.addresses.map((el) => (
                <div className="px-3 py-2 border border-default rounded-2xl">
                  {el.street + ", " + el.house}
                </div>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="text-small">Заказов</p>
          <p className="font-semibold  text-small">{user.orders.length}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-small">Зарегистрирован:</p>
          <p className="font-semibold text-small">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserItem;
