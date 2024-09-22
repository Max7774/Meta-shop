import { FC, useState } from "react";

// import { useActions } from "@hooks/useActions";
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

const Cart: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, total } = useCart();
  const navigate = useNavigate();

  //   const { reset } = useActions();

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      placement="bottom-start"
      className="max-h-96 rounded-2xl border-1 border-default"
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
            <div className="cart-items-container max-h-64 overflow-y-auto">
              {items.map((item) => (
                <CartItem item={item} key={item.uuid} />
              ))}
            </div>
            <Divider />
            <div className="flex justify-between my-5 font-bold">
              <div className="mr-1">Итого:</div>
              <div>{convertPrice(total)}</div>
            </div>
            <Button
              color="primary"
              fullWidth
              onClick={() => {
                navigate("/order");
                setIsOpen(false);
              }}
            >
              Оформить заказ
            </Button>
          </>
        ) : (
          <div className="text-center text-md font-bold">Корзина пуста!</div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Cart;
