/* eslint-disable @typescript-eslint/no-explicit-any */
import { unitofmeasurementData } from "@/const/unitofmeasurement";
import { TOrderItem } from "@/types/TOrder";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

interface IActualizeOrderItemProps {
  items: TOrderItem[];
  orderId: string;
}

const ActualizeOrderItem = ({ items, orderId }: IActualizeOrderItemProps) => {
  const { isOpen, onOpen, onOpenChange, onClose: close } = useDisclosure();
  const { actualizeOrder } = useActions();
  const { isActualLoading } = useAppSelector((state) => state.orders);
  const { handleSubmit, control } = useForm<{ items: TOrderItem[] }>({
    defaultValues: {
      items: items,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  const submit: SubmitHandler<{ items: TOrderItem[] }> = async (data) => {
    const res: any = await actualizeOrder({ items: data.items, orderId });

    if (res.type === "/order/actualize/fulfilled") {
      close();
    } else {
      toast.error("Ошибка актуализации");
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Актуализировать цены
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top"
        scrollBehavior="outside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(submit)}>
              <ModalHeader className="flex flex-col gap-1">
                Актуализация
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  {fields.map((item, index) => (
                    <div key={item?.uuid} className="flex flex-col gap-2">
                      <span className="text-lg font-bold">
                        {item?.product?.name}
                      </span>
                      <Controller
                        name={`items.${index}.price`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            isDisabled
                            labelPlacement="outside"
                            label="Цена"
                            placeholder="Цена"
                            type="number"
                            onChange={onChange}
                            value={value?.toString()}
                            fullWidth
                          />
                        )}
                      />

                      <Controller
                        name={`items.${index}.quantity`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            labelPlacement="outside"
                            label="Количество"
                            placeholder="Количество"
                            type="number"
                            onChange={onChange}
                            value={value?.toString()}
                            fullWidth
                            endContent={
                              <div className="pointer-events-none flex items-center justify-center">
                                <span className="text-default-400">
                                  {
                                    unitofmeasurementData[
                                      item?.product?.unitofmeasurement
                                    ]
                                  }
                                </span>
                              </div>
                            }
                          />
                        )}
                      />

                      {/* Добавьте другие поля по мере необходимости */}
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter className="w-full flex-col">
                <Button
                  color="warning"
                  variant="faded"
                  onPress={() => {
                    actualizeOrder({ items, orderId });
                    onClose();
                  }}
                >
                  Оставить
                </Button>
                <Button
                  isLoading={isActualLoading}
                  color="primary"
                  type="submit"
                >
                  Обновить
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActualizeOrderItem;
