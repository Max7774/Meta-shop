import { TProduct } from "@/types/TProduct";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface IProductsTableProps {
  products: TProduct[];
}

const ProductsTable = ({ products }: IProductsTableProps) => {
  console.log(products[0]);
  return (
    <Table
      aria-label="Product Table"
      //   css={{ maxWidth: "100%", p: "20px" }}
      className="mt-5 max-w-full"
      //   striped
    >
      <TableHeader>
        <TableColumn>№</TableColumn>
        <TableColumn>Название</TableColumn>
        <TableColumn>Категория</TableColumn>
        <TableColumn>Подкатегория</TableColumn>
        <TableColumn>Компания</TableColumn>
        <TableColumn>Дата создания</TableColumn>
        <TableColumn>Статус</TableColumn>
      </TableHeader>
      <TableBody>
        {products?.map((product, index) => (
          <TableRow key={product?.uuid}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{product?.name}</TableCell>
            <TableCell>{product?.subcategory?.category?.name}</TableCell>
            <TableCell>{product?.subcategory?.name}</TableCell>
            <TableCell>
              {product?.company?.map((el) => el?.company?.name).join(", ")}
            </TableCell>
            <TableCell>
              {new Date(product?.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {product?.inStock ? (
                <span className="text-green-600">В наличии</span>
              ) : (
                <span className="text-red-600">Нет в наличии</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
