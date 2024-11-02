import Heading from "@UI/Heading";
import DeletedProductsList from "./DeletedProductsList/DeletedProductsList";
import Search from "@Components/Search/Search";

const SoftDeletedProducts = () => {
  return (
    <section>
      <Heading>Удаленные продукты</Heading>
      <Search pageKey="soft-deleted" className="mb-4" />
      <DeletedProductsList />
    </section>
  );
};

export default SoftDeletedProducts;
