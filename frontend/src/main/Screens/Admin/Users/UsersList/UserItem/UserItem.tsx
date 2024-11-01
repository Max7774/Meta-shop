import { TAdminUser } from "@/types/TUser";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import {
  Accordion,
  AccordionItem,
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
  const { deleteUser } = useActions();
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const { companyUuid } = useAppSelector((state) => state.user.profile);

  const deleteUserHandler = () => {
    setIsLocalLoading(true);
    deleteUser(user.uuid);
    setIsLocalLoading(false);
  };

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
        {!companyUuid && (
          <Button
            color="primary"
            size="sm"
            isLoading={isLocalLoading}
            onClick={deleteUserHandler}
          >
            Удалить пользователя
          </Button>
        )}
      </CardHeader>
      <CardBody className="px-3 py-0 text-small">
        {!companyUuid ? (
          <p>Email: {user.email}</p>
        ) : (
          <div className="flex flex-col">
            <p className="text-default-400">
              (Техническая почта, специально для входа в приложение)
            </p>
            <p>Тех. Email: {user.email}</p>
          </div>
        )}
        <span className="pt-2">Телефон: {user.phone_number}</span>
        {!companyUuid && (
          <Accordion>
            <AccordionItem
              key="1"
              aria-label="Адреса пользователя"
              title="Адреcа пользователя"
            >
              <div className="flex flex-col gap-3">
                {user?.addresses?.map((el) => (
                  <div
                    key={el.uuid}
                    className="px-3 py-2 border border-default rounded-2xl"
                  >
                    {el.street + ", " + el.house}
                    <p className="pr-2">- Дом: {el.house}</p>
                    <p className="pr-2">- Квартира: {el.apartment}</p>
                    <p className="pr-2">- Подъезд: {el.entrance}</p>
                    <p className="pr-2">- Домофон: {el.intercom}</p>
                    <p className="pr-2">- Этаж: {el.floor}</p>
                  </div>
                ))}
              </div>
            </AccordionItem>
          </Accordion>
        )}
      </CardBody>
      <CardFooter className="gap-3">
        {!companyUuid ? (
          <>
            <div className="flex gap-1">
              <p className="text-small">Заказов</p>
              <p className="font-semibold  text-small">
                {user?.orders?.length}
              </p>
            </div>
            <div className="flex gap-1">
              <p className="text-small">Зарегистрирован:</p>
              <p className="font-semibold text-small">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </>
        ) : (
          <Button isDisabled fullWidth color="primary">
            Изменить пароль
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UserItem;
