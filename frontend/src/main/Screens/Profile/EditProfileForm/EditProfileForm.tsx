/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
} from "@nextui-org/react";
import { useActions } from "@hooks/useActions";
import Heading from "@UI/Heading";
import { BASE_URL } from "@/const/baseUrl";
import InputMask from "react-input-mask";
import cn from "clsx";
import { TProfileEdit } from "@/types/TProfile";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { getImageUrl } from "@utils/getImageUrl";

interface IEditProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileForm = ({ isOpen, onClose }: IEditProfileFormProps) => {
  const { profile, isProfileLoading } = useAppSelector((state) => state.user);
  const { updateProfile, setNewUserAvatar } = useActions();

  const [avatarFile, setAvatarFile] = useState<{
    avatarPath: string;
    file: File | null;
  }>({
    avatarPath: BASE_URL + "/file-upload/" + profile.avatarPath,
    file: null,
  });

  const { control, handleSubmit } = useForm<TProfileEdit>({
    defaultValues: {
      email: profile.email || "",
      first_name: profile.first_name || "",
      second_name: profile.second_name || "",
      phone_number: profile.phone_number || "",
    },
  });

  const onSubmit: SubmitHandler<TProfileEdit> = async (data) => {
    const result: any = await updateProfile({ ...data, email: profile.email });
    if (result.type === "/updateProfile/fulfilled") {
      if (avatarFile.file) {
        setNewUserAvatar(avatarFile.file);
      }
      onClose();
    } else {
      toast.error("Ошибка обновления профиля");
    }
  };

  const handleAvatarChange = (e: any) => {
    setAvatarFile({
      avatarPath: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };

  return (
    <Modal placement="top-center" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Heading>Редактировать профиль</Heading>
          </ModalHeader>
          <ModalBody>
            <Controller
              name="first_name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Имя"
                  labelPlacement="outside"
                  placeholder="Введите ваше имя"
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="second_name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  labelPlacement="outside"
                  label="Фамилия"
                  placeholder="Введите вашу фамилию"
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="phone_number"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="flex flex-col">
                  <span className="text-sm mb-1">Телефон</span>
                  <InputMask
                    onChange={onChange}
                    value={value}
                    mask="+7(999)-999-99-99"
                    placeholder="+7(___)-___-__-__"
                    maskChar="_"
                    className={cn(
                      "px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-foreground-500 rounded-xl",
                      {
                        "bg-danger-50": !!error?.message,
                        "bg-default-100": !error?.message,
                      }
                    )}
                  />
                  {!!error?.message && (
                    <span className="text-danger text-xs">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <div className="w-full flex flex-col justify-center">
              <Avatar
                src={
                  !avatarFile.avatarPath.includes("blob")
                    ? getImageUrl(profile.avatarPath)
                    : avatarFile.avatarPath
                }
                alt={profile.first_name}
                size="lg"
                className="mb-4 md:mb-0"
              />
              <Input
                type="file"
                label="Аватар"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" color="danger" onClick={onClose}>
              Отмена
            </Button>
            <Button isLoading={isProfileLoading} color="primary" type="submit">
              Сохранить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileForm;
