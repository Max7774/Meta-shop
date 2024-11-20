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

const selectedRow = [5, 10, 20, 50, 100];

export { columns, statusOptions, selectedRow };
