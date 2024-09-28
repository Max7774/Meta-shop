export type TSubCategory = {
  uuid: string;
  name: string;
  slug: string;
  icon: string;
  categoryUuid?: string;
  category?: TCategory;
};

export type TCreateSubCategory = {
  name: string;
  categoryUuid: string;
  icon?: File;
};

export type TCategory = {
  uuid: string;
  name: string;
  slug: string;
  icon: string;
  subcategory: TSubCategory[];
};
