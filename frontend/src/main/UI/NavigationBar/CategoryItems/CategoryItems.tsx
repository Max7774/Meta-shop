import { useCategory } from "@hooks/useCategory";
import { Card, CardBody, NavbarMenuItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const CategoryItems = ({
  setIsMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { categories } = useCategory();

  return (
    <>
      {categories.map(({ uuid, name, slug }, index) => (
        <NavbarMenuItem
          // onClick={() => setIsMenuOpen(false)}
          className="justify-self-center w-full"
          key={`${uuid}-${index}`}
        >
          <Card
            fullWidth
            isHoverable
            isPressable
            onPress={() => {
              navigate(`/categories/${slug}`);
              setIsMenuOpen(false);
            }}
          >
            <CardBody>
              <p className="font-bold">{name}</p>
            </CardBody>
          </Card>
        </NavbarMenuItem>
      ))}
    </>
  );
};

export default CategoryItems;
