const columns = [
  { name: "Название", uid: "name", sortable: true },
  { name: "Описание", uid: "description", sortable: true },
  { name: "Категории", uid: "category", sortable: true },
  { name: "Подкатегория", uid: "subcategory" },
  { name: "Фирма", uid: "company" },
  { name: "Наличие", uid: "inStock", sortable: true },
  { name: "Создан", uid: "createdAt", sortable: true },
  { name: "Действия", uid: "actions" },
];

const statusOptions = [
  { name: "В наличии", uid: "true" },
  { name: "Нет в наличии", uid: "false" },
];

export { columns, statusOptions };
