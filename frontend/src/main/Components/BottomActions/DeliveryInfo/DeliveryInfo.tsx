import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaAngleRight } from "react-icons/fa";

const DeliveryInfo = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section>
      <div className="rounded-full bg-default-200 p-1">
        <FaAngleRight size={15} color="gray" onClick={onOpen} />
      </div>
      <Modal isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Доставка
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                    
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
    </section>
  );
};

export default DeliveryInfo;
