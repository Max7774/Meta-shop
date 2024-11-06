import { convertPrice } from "@utils/convertPrice";
import { MdOutlineDeliveryDining } from "react-icons/md";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { FaAngleRight } from "react-icons/fa";
import Actions from "./Actions/Actions";
import SelectCompany from "@UI/SelectCompany/SelectCompany";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { useEffect } from "react";

const BottomActions = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { getAllCompanies } = useActions();
  const { companies } = useAppSelector((state) => state.company);

  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);

  return (
    <>
      <div className="fixed bottom-0 bg-white z-30 w-full px-4 pt-3 pb-8 shadow-[0px_-7px_22px_1px_rgba(34,60,80,0.29)] rounded-t-3xl sm:hidden flex flex-col items-center gap-3">
        <div
          className="flex flex-row gap-2 justify-center items-center"
          onClick={onOpen}
        >
          <div>
            <MdOutlineDeliveryDining size={20} />
          </div>
          <span className="text-xs text-center pt-0.5">
            Доставка: {convertPrice(800)}
          </span>
          <div className="rounded-full bg-default-200 p-1">
            <FaAngleRight size={15} color="gray" onClick={onOpen} />
          </div>
        </div>
        <SelectCompany company={companies} />
        <div className="w-full">
          <Actions />
        </div>
        <Modal isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Доставка
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-1">
                    <p>Доставка {convertPrice(800)}</p>
                    <Divider className="my-1" />
                    <p>Принимаются заказы: 9:00 — 13:00</p>
                    <p className="text-warning">Ягоды до 9:00</p>
                    <Divider className="my-1" />
                    <p>Доставка: 13:00 — 20:00</p>
                    <p className="text-warning">Ягоды до 13:00</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Закрыть
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default BottomActions;
