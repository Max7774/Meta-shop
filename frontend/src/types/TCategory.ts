export type TSubCategory = {
  uuid: string;
  name: string;
  slug: string;
};

export type TCategory = {
  uuid: string;
  name: string;
  slug: string;
  icon: string;
  subcategory: TSubCategory[];
};
