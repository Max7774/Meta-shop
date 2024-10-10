/* eslint-disable @typescript-eslint/no-explicit-any */
import { useActions } from "@hooks/useActions";
import {
  Modal,
  ModalContent,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import NewAddressForm from "./NewAddressForm/NewAddressForm";
import { FiPlus } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";

interface IAddressProps {
  disabled?: boolean;
}

const Address = ({ disabled }: IAddressProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    profile: { addresses, currentAddress },
    isProfileLoading,
  } = useAppSelector((state) => state.user);
  const { setCurrentAddress } = useActions();

  const [selectedKeys, setSelectedKeys] = useState(() => {
    const initialKey =
      currentAddress || (addresses.length > 0 ? addresses[0].uuid : null);
    return initialKey ? new Set([initialKey]) : new Set([]);
  });

  useEffect(() => {
    const initialKey =
      currentAddress || (addresses.length > 0 ? addresses[0].uuid : null);
    if (initialKey) {
      setSelectedKeys(new Set([initialKey]));
    }
  }, [currentAddress, addresses]);

  const selectedAddress = useMemo(() => {
    const key = Array.from(selectedKeys)[0];
    if (!key) return null;
    return addresses.find((address) => address.uuid === key) || null;
  }, [selectedKeys, addresses]);

  const handleSelectionChange = (keys: any) => {
    const selectedUuid = Array.from(keys)[0];
    if (selectedUuid === "new_address") {
      onOpen();
    } else {
      setSelectedKeys(keys);
      const newCurrentAddress = addresses.find(
        (address) => address.uuid === selectedUuid
      );
      if (newCurrentAddress) {
        setCurrentAddress(newCurrentAddress.uuid);
      }
    }
  };

  return (
    <section>
      {currentAddress ? (
        <Dropdown isDisabled={disabled}>
          <DropdownTrigger>
            <Button
              isLoading={isProfileLoading}
              variant="ghost"
              fullWidth
              size="lg"
              className="font-bold"
            >
              <span className="flex flex-row gap-2 items-center">
                <span>
                  {selectedAddress
                    ? `${selectedAddress.street}, ${selectedAddress.house}`
                    : "Выберите адрес"}
                </span>
                <span>
                  <FaAngleDown />
                </span>
              </span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="shadow"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
          >
            {[
              ...addresses.map((el) => (
                <DropdownItem key={el.uuid}>
                  {el.street + ", " + el.house}
                </DropdownItem>
              )),
              <DropdownItem
                key="new_address"
                closeOnSelect={false}
                onPress={onOpen}
              >
                <span className="flex flex-row gap-2 items-center">
                  <FiPlus size={15} />
                  <span>Новый адрес</span>
                </span>
              </DropdownItem>,
            ]}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button fullWidth size="lg" color="secondary" onClick={onOpen}>
          <span className="flex flex-row gap-2 items-center text-white">
            <FiPlus size={20} />
            <span>Новый адрес</span>
          </span>
        </Button>
      )}
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => <NewAddressForm onClose={onClose} />}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default Address;
