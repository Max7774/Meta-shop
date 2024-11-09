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
  Button,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useActions } from "@hooks/useActions";
import { Logo } from "../Logo/LogoIcon";
import Cart from "../../Components/Cart/Cart";
import { useProfile } from "@hooks/useProfile";
import { ERoles } from "@enums/ERoles";
import AdminItems from "./AdminItems/AdminItems";
import CategoryItems from "./CategoryItems/CategoryItems";
import {
  ADMIN_GlOBAL_PREFIX,
  COMPANY_GlOBAL_PREFIX,
} from "@/const/globalPrefix";
import { getImageUrl } from "@utils/getImageUrl";
import CompanyItems from "./CompanyItems/CompanyItems";
import SelectCompany from "@UI/SelectCompany/SelectCompany";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";

interface INavigationBarProps {
  isBottomActions: boolean;
}

export const NavigationBar = ({ isBottomActions }: INavigationBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth } = useAuth();
  const { logout } = useActions();

  const {
    isProfileLoading,
    profile: { avatarPath, role },
  } = useProfile();
  const { companies } = useAppSelector((state) => state.company);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dropdownItems = [
    {
      role: [ERoles.ADMIN],
      key: "admin-panel",
      onClick: () => {
        navigate(`${ADMIN_GlOBAL_PREFIX}users`);
        setIsMenuOpen(false);
      },
      color: "default",
      label: "Админ панель",
    },
    {
      role: [ERoles.COMPANY],
      key: "company-panel",
      onClick: () => {
        navigate(`${COMPANY_GlOBAL_PREFIX}company-info`);
        setIsMenuOpen(false);
      },
      color: "default",
      label: "Панель",
    },
    {
      role: [ERoles.DEFAULT_USER, ERoles.ADMIN],
      key: "profile",
      onClick: () => {
        navigate("/profile");
        setIsMenuOpen(false);
      },
      color: "default",
      label: "Профиль",
    },
    {
      role: [ERoles.DEFAULT_USER],
      key: "orders",
      onClick: () => {
        navigate("/orders");
        setIsMenuOpen(false);
      },
      color: "default",
      label: "Заказы",
    },
    {
      role: [ERoles.DEFAULT_USER],
      key: "archived-orders",
      onClick: () => {
        navigate("/archived-orders");
        setIsMenuOpen(false);
      },
      color: "default",
      label: "Архив заказов",
    },
    {
      role: [ERoles.DEFAULT_USER, ERoles.ADMIN, ERoles.COMPANY],
      key: "logout",
      onClick: () => {
        logout();
        setIsMenuOpen(false);
      },
      color: "danger",
      label: "Выйти",
    },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
    >
      <NavbarContent
        onClick={() => {
          navigate("/");
          setIsMenuOpen(false);
        }}
        style={{ cursor: "pointer" }}
      >
        <NavbarMenuToggle
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu>
        <div className="flex flex-col w-full gap-5 py-4">
          {pathname.startsWith("/admin") ? (
            <AdminItems setIsMenuOpen={setIsMenuOpen} />
          ) : pathname.startsWith("/company") ? (
            <CompanyItems setIsMenuOpen={setIsMenuOpen} />
          ) : (
            <CategoryItems setIsMenuOpen={setIsMenuOpen} />
          )}
        </div>
      </NavbarMenu>
      <NavbarContent className="hidden sm:flex sm:w-1/3 gap-4" justify="center">
        {!isBottomActions && <SelectCompany company={companies} />}
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Cart />
        {!isAuth && (
          <Button
            onClick={() => navigate("/auth/login")}
            variant="flat"
            color="primary"
          >
            Войти
          </Button>
        )}
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
