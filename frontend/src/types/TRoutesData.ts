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

export type TAdminRootRoute = {
  [T in string]: {
    Loader?: () => JSX.Element;
    id?: string;
    key?: string;
    another_routes?: string;
    routes: TRootRoutes<EAdminRoutes>[];
    role: ERoles;
  };
};

export type TCompanyRootRoute = {
  [T in string]: {
    Loader?: () => JSX.Element;
    id?: string;
    key?: string;
    another_routes?: string;
    routes: TRootRoutes<ECompanyRoutes>[];
    role: ERoles;
  };
};

export type TRoutes<T> = {
  id: string;
  path: T;
  component: React.LazyExoticComponent<() => JSX.Element>;
  label?: string;
  Icon?: IconType;
  pathId?: number;
};
