export enum ERoutes {
  ROOT = "/",
  AUTH = "/auth/:typeOfAuth",
  PRODUCT_CARD = "/product/:productSlug/:categorySlug/:subcategorySlug",
  CATEGORIES_ROOT = "/categories",
  CATEGORIES = "/categories/:categorySlug",
  SUB_CATEGORIES = "/categories/:categorySlug/:subcategorySlug",
  ORDER = "/order",
  ORDERS = "/orders",
  PROFILE = "/profile",
  ABOUT = "/about",
  CONTACTS = "/contacts",
  RECEIPT = "/order/:orderId",
  ARCHIVED_ORDERS = "/archived-orders",
  CLAIM = "/claim",
}

export enum EAdminRoutes {
  ROOT = "",
  ORDERS = "orders",
  CATEGORIES = "categories",
  USERS = "users",
  ADD_PRODUCT = "add-product",
  EDIT_PRODUCT = "product/:productSlug",
  ARCHIVED_ORDERS = "archived-orders",
  ADD_COMPANY = "add-company",
  SOFT_DELETED = "soft-deleted",
  CLAIMS = "claims",
}

export enum ECompanyRoutes {
  ADD_PRODUCT = "add-product",
  STATISTICS = "statistics",
  COMPANY_ORDERS = "orders",
  ARCHIVED_ORDERS = "archived-orders",
  EDIT_PRODUCT = "product/:productSlug",
  COMPANY_INFO = "company-info",
}
