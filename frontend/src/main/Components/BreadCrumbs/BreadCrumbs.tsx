import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import cn from "clsx";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";

const BreadCrumbs = () => {
  const { breadcrumbs } = useAppSelector((state) => state.breadcrumb);

  const { pathname } = useLocation();

  return (
    <Breadcrumbs
      maxItems={3}
      className={cn("mb-2", {
        "mx-6": pathname.startsWith("/product"),
      })}
      radius="full"
      variant="solid"
    >
      {breadcrumbs.map((breadcrumb) => (
        <BreadcrumbItem>
          <Link to={breadcrumb.path}>{breadcrumb.title}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
