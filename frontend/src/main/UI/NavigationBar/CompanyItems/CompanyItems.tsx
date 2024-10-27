import { COMPANY_SIDEBAR_ITEMS } from "@/const/company_items";
import { Card, CardBody, NavbarMenuItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const CompanyItems = ({
  setIsMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  return (
    <>
      {COMPANY_SIDEBAR_ITEMS.map(({ uuid, name, slug }, index) => (
        <NavbarMenuItem
          className="justify-self-center w-full"
          key={`${uuid}-${index}`}
        >
          <Card
            fullWidth
            isHoverable
            isPressable
            onPress={() => {
              navigate(slug);
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

export default CompanyItems;
