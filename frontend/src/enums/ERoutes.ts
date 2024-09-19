export enum ERoutes {
  ROOT = "/",
  AUTH = "/auth",
  PRODUCT_CARD = "/product/:productSlug",
  CATEGORIES = "/categories/:categorySlug",
  SUB_CATEGORIES = "/categories/:categorySlug/:subcategorySlug",
  ORDER = "/order",
  ORDERS = "/orders",
  PROFILE = "/profile",
}

export enum EAdminRoutes {
  ROOT = "",
  ORDERS = "orders",
  CATEGORIES = "categories",
  USERS = "users",
  PRODUCTS = "products",
}
