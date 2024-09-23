import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Skeleton,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useActions } from "@hooks/useActions";
import { AcmeLogo } from "./LogoIcon";
import Cart from "../../Components/Cart/Cart";
import { useProfile } from "@hooks/useProfile";
import { ERoles } from "@enums/ERoles";
import AdminItems from "./AdminItems/AdminItems";
import CategoryItems from "./CategoryItems/CategoryItems";
import { ADMIN_GlOBAL_PREFIX } from "@/const/globalPrefix";
import { getImageUrl } from "@utils/getImageUrl";

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth } = useAuth();
  const { logout } = useActions();

  const {
    isProfileLoading,
    profile: { avatarPath, role },
  } = useProfile();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dropdownItems = [
    {
      role: [ERoles.ADMIN],
      key: "admin-panel",
      onClick: () => navigate(`${ADMIN_GlOBAL_PREFIX}products`),
      color: "default",
      label: "Админ панель",
    },
    {
      role: [ERoles.DEFAULT_USER, ERoles.ADMIN],
      key: "profile",
      onClick: () => navigate("/profile"),
      color: "default",
      label: "Профиль",
    },
    {
      role: [ERoles.DEFAULT_USER, ERoles.ADMIN],
      key: "orders",
      onClick: () => navigate("/orders"),
      color: "default",
      label: "Заказы",
    },
    {
      role: [ERoles.DEFAULT_USER, ERoles.ADMIN],
      key: "logout",
      onClick: () => logout(),
      color: "danger",
      label: "Выйти",
    },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
    >
      <NavbarContent
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <NavbarMenuToggle
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit hidden sm:block ml-2">GreenGo</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu>
        <div className="flex flex-col w-full gap-5 py-4">
          {pathname.startsWith("/admin") ? (
            <AdminItems setIsMenuOpen={setIsMenuOpen} />
          ) : (
            <CategoryItems setIsMenuOpen={setIsMenuOpen} />
          )}
        </div>
      </NavbarMenu>
      <NavbarContent as="div" className="items-center" justify="end">
        <Cart />
        {isAuth && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {isProfileLoading ? (
                <Skeleton className="flex rounded-full w-12 h-12" />
              ) : (
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="default"
                  name="Jason Hughes"
                  size="sm"
                  src={getImageUrl(avatarPath)}
                />
              )}
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              {dropdownItems
                .filter((el) => el.role.includes(role))
                .map((el) => (
                  <DropdownItem
                    key={el.key}
                    color={
                      el.color as
                        | "default"
                        | "danger"
                        | "primary"
                        | "secondary"
                        | "success"
                        | "warning"
                    }
                    className="h-7 gap-2"
                    onClick={el.onClick}
                  >
                    <p className="font-semibold">{el.label}</p>
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
};
