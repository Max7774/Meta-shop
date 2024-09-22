import { TAddressForm } from "@/types/TAddress";
import { useActions } from "@hooks/useActions";
import { Input } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { toast } from "react-toastify";

interface INewAddressFormProps {
  onClose: () => void;
}

const NewAddressForm = ({ onClose }: INewAddressFormProps) => {
  const { createAddress } = useActions();
  const { isProfileLoading } = useAppSelector((state) => state.user);

  const { handleSubmit, control } = useForm<TAddressForm>();

  const submit: SubmitHandler<TAddressForm> = async (data) => {
    const res: any = await createAddress(data);
    if (res.type === "/createAddress/fulfilled") {
      onClose();
    } else {
      toast.error("Ошибка добавления адреса");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <ModalHeader className="flex flex-col items-center gap-1">
        Новый адрес
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-5">
          <Controller
            control={control}
            name="town"
            rules={{ required: "Это поле обязательно!" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder="Город"
                label="Напишите ваш город"
                onChange={onChange}
                value={value}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="street"
            rules={{ required: "Это поле обязательно!" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder="Улица"
                label="Напишите вашу улицу"
                onChange={onChange}
                value={value}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="house"
            rules={{ required: "Это поле обязательно!" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder="Дом/Корпус"
                label="Номер дома/корпуса"
                onChange={onChange}
                value={value}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
          <div className="flex flex-row gap-5">
            <Controller
              control={control}
              name="apartment"
              rules={{ required: "Это поле обязательно!" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Квартира"
                  label="Квартира"
                  onChange={onChange}
                  value={value}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="intercom"
              rules={{ required: "Это поле обязательно!" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Домофон"
                  label="Домофон"
                  onChange={onChange}
                  value={value}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
          <div className="flex flex-row gap-5">
            <Controller
              control={control}
              name="entrance"
              rules={{ required: "Это поле обязательно!" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Подъезд"
                  label="Подъезд"
                  onChange={onChange}
                  value={value}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="floor"
              rules={{ required: "Это поле обязательно!" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Этаж"
                  label="Этаж"
                  onChange={onChange}
                  value={value}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Закрыть
        </Button>
        <Button type="submit" isLoading={isProfileLoading} color="primary">
          Добавить
        </Button>
      </ModalFooter>
    </form>
  );
};

export default NewAddressForm;
