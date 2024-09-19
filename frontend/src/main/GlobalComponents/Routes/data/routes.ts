import {
  ADMIN_GlOBAL_PREFIX,
  ANOTHER_ROUTES,
  GlOBAL_PREFIX,
} from "@/const/globalPrefix";
import { TAdminRootRoute, TRootRoute } from "@/types/TRoutesData";
import { ERoles } from "@enums/ERoles";
import { getNotFound } from "@utils/getNotFound";
import { ROOT_DATA } from "./root/RootData";
import { ADMIN_ROUTES } from "./admin/AdminData";

export const ROUTES: TRootRoute = {
  [GlOBAL_PREFIX]: {
    id: getNotFound(ERoles.DEFAULT_USER),
    key: getNotFound(ERoles.DEFAULT_USER),
    another_routes: ANOTHER_ROUTES,
    routes: ROOT_DATA,
  },
};

export const ADMIN_ROUTES_DATA: TAdminRootRoute = {
  [ADMIN_GlOBAL_PREFIX]: {
    id: getNotFound(ERoles.ADMIN),
    key: getNotFound(ERoles.ADMIN),
    another_routes: ANOTHER_ROUTES,
    routes: ADMIN_ROUTES,
  },
};
