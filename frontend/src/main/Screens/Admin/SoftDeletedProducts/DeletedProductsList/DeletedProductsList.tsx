import Products from "@Components/Products/Products";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import { CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";

const DeletedProductsList = () => {
  const { getAllSoftDeleted } = useActions();

  const { isLoading, products } = useAppSelector((state) => state.products);

  const { queryParams } = useAppSelector(
    (state) => state.filters["soft-deleted"]
  );

  useEffect(() => {
    getAllSoftDeleted(queryParams);
  }, [getAllSoftDeleted, queryParams]);

  if (isLoading) return <CircularProgress />;

  return (
    <div>
      <Products products={products || []} />
    </div>
  );
};

export default DeletedProductsList;
