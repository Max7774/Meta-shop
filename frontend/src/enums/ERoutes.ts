export enum ERoutes {
  ROOT = "/",
  AUTH = "/auth",
  PRODUCT_CARD = "/product/:productSlug",
  CATEGORIES = "/categories/:categorySlug",
  SUB_CATEGORIES = "/categories/:categorySlug/:subcategorySlug",
  ORDER = "/order",
  ORDERS = "/orders",
  PROFILE = "/profile",
  ABOUT = "/about",
  CONTACTS = "/contacts",
}

export enum EAdminRoutes {
  ROOT = "",
  ORDERS = "orders",
  CATEGORIES = "categories",
  USERS = "users",
  PRODUCTS = "products",
  EDIT_PRODUCT = "product/:productSlug",
}
