import { ERoles } from "@enums/ERoles";
import { EAdminRoutes, ECompanyRoutes, ERoutes } from "@enums/ERoutes";
import { IconType } from "react-icons";

export type TRootRoutes<T> = {
  id: string;
  path: T;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

export type TRootRoute = {
  [T in string]: {
    Loader?: () => JSX.Element;
    id?: string;
    key?: string;
    another_routes?: string;
    routes: TRootRoutes<ERoutes>[];
  };
};

export type TAuthRoutes<E> = {
  id: string;
  path: E;
  component: React.LazyExoticComponent<() => JSX.Element>;
  label?: string;
  Icon?: IconType;
  pathId?: number;
};

export type TRoutes<T> = {
  id: string;
  path: T;
  component: React.LazyExoticComponent<() => JSX.Element>;
  label?: string;
  Icon?: IconType;
  pathId?: number;
};

type TMainRoutes = TAuthRoutes<ECompanyRoutes> | TAuthRoutes<EAdminRoutes>;

export type TMainRootRoute = {
  [T in string]: {
    role: ERoles;
    routes: TMainRoutes[];
    Loader?: () => JSX.Element;
    id?: string;
    key?: string;
    another_routes?: string;
  };
};
