import {
  ADMIN_GlOBAL_PREFIX,
  ANOTHER_ROUTES,
  COMPANY_GlOBAL_PREFIX,
  GlOBAL_PREFIX,
} from "@/const/globalPrefix";
import { TMainRootRoute, TRootRoute } from "@/types/TRoutesData";
import { ERoles } from "@enums/ERoles";
import { getNotFound } from "@utils/getNotFound";
import { ROOT_DATA } from "./root/RootData";
import { ADMIN_ROUTES } from "./admin/AdminData";
import { COMPANY_ROUTES } from "./company/CompanyData";

export const ROUTES: TRootRoute = {
  [GlOBAL_PREFIX]: {
    id: getNotFound(ERoles.DEFAULT_USER),
    key: getNotFound(ERoles.DEFAULT_USER),
    another_routes: ANOTHER_ROUTES,
    routes: ROOT_DATA,
  },
};

export const AUTH_ROLES_ROUTES: TMainRootRoute = {
  [ADMIN_GlOBAL_PREFIX]: {
    id: getNotFound(ERoles.ADMIN),
    key: getNotFound(ERoles.ADMIN),
    another_routes: ANOTHER_ROUTES,
    routes: ADMIN_ROUTES,
    role: ERoles.ADMIN,
  },
  [COMPANY_GlOBAL_PREFIX]: {
    id: getNotFound(ERoles.COMPANY),
    key: getNotFound(ERoles.COMPANY),
    another_routes: ANOTHER_ROUTES,
    routes: COMPANY_ROUTES,
    role: ERoles.COMPANY,
  },
};
