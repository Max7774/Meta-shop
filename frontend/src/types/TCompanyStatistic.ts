export type TCompanyStatistic = {
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  productsWithSales: {
    productName: string;
    unitsSold: number;
  }[];
};
