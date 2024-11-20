import { TProduct } from "@/types/TProduct";
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  User,
} from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";
import { useCallback } from "react";
import { VerticalDotsIcon } from "../Icons/VerticalDotsIcon";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@hooks/useProducts";

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};

export const useRenderCell = () => {
  const navigate = useNavigate();
  const { isLoading } = useProducts();

  const renderCell = useCallback(
    (product: TProduct, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof TProduct]?.toString();

      if (isLoading)
        return (
          <Skeleton className="w-3/5 rounded-md">
            <div className="h-7 w-3/5 rounded-md bg-default-200"></div>
          </Skeleton>
        );

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: getImageUrl(product?.images[0]),
              }}
              description={product?.subcategory?.name}
              name={cellValue}
            >
              {product?.name}
            </User>
          );
        case "category":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {product?.subcategory?.category?.name}
              </p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {product?.subcategory?.name}
              </p>
            </div>
          );
        case "inStock":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[JSON.stringify(product?.inStock)]}
              size="sm"
              variant="flat"
            >
              {product?.inStock ? "В наличии" : "Нет в наличии"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu disabledKeys={["remove"]}>
                  <DropdownItem
                    onClick={() =>
                      navigate(
                        `/product/${product?.slug}/${product?.subcategory?.category?.slug}/${product?.subcategory?.slug}`
                      )
                    }
                  >
                    Карточка
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => navigate(`/admin/product/${product?.slug}`)}
                  >
                    Редактировать
                  </DropdownItem>
                  <DropdownItem color="danger" key="remove">
                    Удалить
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        case "company":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {product?.company[0]?.company.name}
              </p>
            </div>
          );
        case "createdAt":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {new Date(product?.createdAt).toLocaleString()}
              </p>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [navigate, isLoading]
  );

  return { renderCell };
};
