import { TSubCategory } from "@/types/TCategory";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { getImageUrl } from "@utils/getImageUrl";
import { useNavigate } from "react-router-dom";

interface ISubcategoriesListProps {
  subcategories: TSubCategory[];
  categorySlug: string;
}

const SubcategoriesList = ({
  subcategories,
  categorySlug,
}: ISubcategoriesListProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 desktop:grid-cols-5">
        {subcategories.map((item) => (
          <Card
            shadow="sm"
            key={item.uuid}
            isPressable
            onPress={() => {
              navigate(`/categories/${categorySlug}/${item.slug}`);
            }}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="300px"
                alt={item.name}
                className="w-full object-cover h-[140px]"
                src={getImageUrl(item.icon)}
              />
            </CardBody>
            <CardFooter className="text-small justify-center">
              <b>{item.name}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubcategoriesList;
