import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import {
  CircularProgress,
  Table,
  Card,
  CardBody,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Heading from "@UI/Heading";
import { useEffect } from "react";

const Statistics = () => {
  const { getProductsStatistics } = useActions();

  const { isLoading, statistic } = useAppSelector((state) => state.company);

  useEffect(() => {
    getProductsStatistics();
  }, [getProductsStatistics]);

  if (isLoading) return <CircularProgress />;

  return (
    <section>
      <Heading>Статистика</Heading>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-lg">
          <CardBody className="flex flex-col items-center">
            <span className="text-center">Всего товаров</span>
            <span className="text-center text-2xl font-bold">
              {statistic.totalProducts}
            </span>
          </CardBody>
        </Card>
        <Card className="shadow-lg">
          <CardBody className="flex flex-col items-center">
            <span className="text-center">Всего заказов</span>
            <span className="text-center text-2xl font-bold">
              {statistic.totalOrders}
            </span>
          </CardBody>
        </Card>
        <Card className="shadow-lg">
          <CardBody className="flex flex-col items-center">
            <span className="text-center">Всего продаж</span>
            <span className="text-center text-2xl font-bold">
              {statistic.totalSales}
            </span>
          </CardBody>
        </Card>
      </div>

      {/* Таблица продаж по продуктам */}
      <div className="mt-6">
        <span className="mb-4 h-4 font-bold text-lg">Продажи по продуктам</span>
        <Table
          aria-label="Продажи по продуктам"
          selectionMode="none"
          className="min-w-full mt-3"
        >
          <TableHeader>
            <TableColumn>Название продукта</TableColumn>
            <TableColumn>Продано единиц</TableColumn>
          </TableHeader>
          <TableBody>
            {statistic?.productsWithSales?.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.unitsSold}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Statistics;
