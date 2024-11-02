import { TSubCategory } from "@/types/TCategory";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
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
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {subcategories.map((item) => (
          <Card
            isHoverable
            isPressable
            key={item.uuid}
            isFooterBlurred
            onPress={() => navigate(`/categories/${categorySlug}/${item.slug}`)}
            className="w-full aspect-square"
          >
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src={getImageUrl(item.icon)}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <Button
                fullWidth
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
                onPress={() =>
                  navigate(`/categories/${categorySlug}/${item.slug}`)
                }
              >
                {item.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubcategoriesList;
