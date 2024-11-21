import { FC, useState } from "react";

import { useCart } from "@/hooks/useCart";
import { convertPrice } from "@/utils/convertPrice";

import CartItem from "./cart-item/CartItem";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
} from "@nextui-org/react";
import { RiShoppingCartLine } from "react-icons/ri";
import { useActions } from "@hooks/useActions";

const Cart: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, total } = useCart();
  const { reset } = useActions();
  const navigate = useNavigate();

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      placement="bottom"
      backdrop="transparent"
      className="max-h-96 w-screen sm:w-full rounded-2xl border-1 border-default"
    >
      <PopoverTrigger>
        <Button variant="light" className="px-0" size="md">
          <Badge content={items.length} color="primary">
            <RiShoppingCartLine size={24} />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-5">
        {items.length ? (
          <>
            <span className="text-xl font-bold">Моя корзина</span>
            <Divider className="mt-5" />
            <div className="cart-items-container w-full max-h-64 my-3 overflow-y-auto">
              {items.map((item) => (
                <CartItem item={item} key={item.uuid} />
              ))}
            </div>
            <Divider />
            <div className="w-full flex justify-between my-5 font-bold">
              <div className="mr-1">Итого:</div>
              <div>{convertPrice(total)}</div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Button
                color="primary"
                fullWidth
                size="sm"
                onClick={() => {
                  navigate("/order");
                  setIsOpen(false);
                }}
              >
                Оформить заказ
              </Button>
              <Button
                startContent={<RiShoppingCartLine size={15} />}
                color="primary"
                fullWidth
                variant="flat"
                size="sm"
                onClick={() => {
                  reset();
                  setIsOpen(false);
                }}
              >
                Очистить коризну
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center text-md font-bold">Корзина пуста!</div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Cart;
