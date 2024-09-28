/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Products from "@/main/Components/Products/Products";
import Heading from "@/main/UI/Heading";
import { TProductCreateForm } from "@/types/TProduct";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import {
  Button,
  Divider,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useCategory } from "@hooks/useCategory";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { unitofmeasurementData } from "@/const/unitofmeasurement";

const AdminProducts = () => {
  const { products, isLoading } = useProducts();
  const { categories } = useCategory();
  const { getProductsAll, getCategoriesAll, createProduct } = useActions();

  const { control, handleSubmit, clearErrors, setError, reset } =
    useForm<TProductCreateForm>();

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [selectedCategory, setCategory] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    files.forEach((file) => {
      console.log(file.size);
      if (file.size > 1024) {
        toast.error("Размер файла должен быть меньше 2MB");
        return "Размер файла должен быть меньше 2MB";
      }
    });

    if (files.length > 5) {
      setError("images", {
        type: "manual",
        message: "Можно загрузить не более 5 изображений",
      });
      e.target.value = ""; // Сбрасываем выбранные файлы
      setPreviewImages([]);
      setSelectedFiles([]);
      return;
    } else {
      clearErrors("images");
    }

    setSelectedFiles((prev) => [...files, ...prev]);
    setPreviewImages((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const submit: SubmitHandler<TProductCreateForm> = async (data) => {
    console.log(data);
    data.images = selectedFiles;
    const result: any = await createProduct(data);
    if (result.type === "products/createProduct/fulfilled") {
      toast.success("Продукт создан успешно!");
      setPreviewImages([]);
      setSelectedFiles([]);
      reset();
      window.location.reload();
    } else {
      toast.error("Ошибка создания продукта");
    }
  };

  useEffect(() => {
    getCategoriesAll();
  }, [getCategoriesAll]);

  useEffect(() => {
    getProductsAll({});
  }, [getProductsAll]);

  return (
    <section>
      <Heading>Добавление нового продукта</Heading>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
        <Controller
          control={control}
          name="name"
          rules={{ required: "Название обязательно" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Название продукта"
              placeholder="Введите название продукта"
              onChange={onChange}
              value={value}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: "Описание обязательно" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Textarea
              label="Описание продукта"
              placeholder="Введите описание продукта"
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              onChange={onChange}
              value={value}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          rules={{
            required: "Цена обязательна",
            min: { value: 0, message: "Цена не может быть отрицательной" },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Цена"
              type="number"
              placeholder="Введите цену продукта"
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              onChange={onChange}
              value={value?.toString()}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="unitofmeasurement"
          rules={{ required: "Выберите единицу измерения" }}
          render={({ field, fieldState: { error } }) => (
            <Select
              label="Единица измерения"
              placeholder="Выберите единицу измерения"
              selectedKeys={[field.value]}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as string;
                field.onChange(selectedKey);
              }}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              fullWidth
            >
              {Object.entries(unitofmeasurementData).map(([key, value]) => (
                <SelectItem key={key}>{value}</SelectItem>
              ))}
            </Select>
          )}
        />
        <Select
          label="Категория"
          placeholder="Выберите категорию"
          selectedKeys={[selectedCategory]}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string;
            setCategory(selectedKey);
          }}
          fullWidth
        >
          {categories.map((category) => (
            <SelectItem key={category.uuid} value={category.uuid}>
              {category.name}
            </SelectItem>
          ))}
        </Select>
        {!!selectedCategory && (
          <Controller
            control={control}
            name="subcategoryUuid"
            rules={{ required: "Выберите подкатегорию" }}
            render={({ field, fieldState: { error } }) => (
              <Select
                label="Подкатегория"
                placeholder="Выберите подкатегорию"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  field.onChange(selectedKey);
                }}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                fullWidth
              >
                {(
                  categories.find((cat) => cat.uuid === selectedCategory)
                    ?.subcategory || []
                ).map((subcategory) => (
                  <SelectItem key={subcategory.uuid} value={subcategory.uuid}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        )}
        <Controller
          control={control}
          name="discount"
          rules={{
            min: {
              value: 0,
              message: "Скидка не может быть отрицательной",
            },
            max: { value: 100, message: "Скидка не может превышать 100%" },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Скидка (%)"
              type="number"
              placeholder="Введите процент скидки"
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              onChange={onChange}
              value={value?.toString()}
              fullWidth
            />
          )}
        />
        <div>
          <Controller
            control={control}
            name="images"
            rules={{ required: "Добавьте хотя бы одно изображение" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Изображения
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    handleImageChange(e);
                    field.onChange(e.target.files);
                  }}
                  className={`mt-1 block w-full ${
                    error ? "border-red-500" : ""
                  }`}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </>
            )}
          />
          {/* Предварительный просмотр изображений */}
          <div className="flex flex-wrap gap-4 mt-4">
            {previewImages.map((src, index) => (
              <div key={index} className="relative">
                <Image
                  src={src}
                  alt={`Preview ${index}`}
                  className="sm:w-32 sm:h-32 object-cover rounded-2xl"
                />
                {/* Кнопка для удаления изображения */}
                <button
                  type="button"
                  onClick={() => {
                    const newPreviewImages = [...previewImages];
                    const newSelectedFiles = [...selectedFiles];
                    newPreviewImages.splice(index, 1);
                    newSelectedFiles.splice(index, 1);
                    setPreviewImages(newPreviewImages);
                    setSelectedFiles(newSelectedFiles);
                  }}
                  className="absolute -top-2 -right-2 z-10 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <IoClose size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <Button
          type="submit"
          isLoading={isLoading}
          color="primary"
          fullWidth
          size="lg"
        >
          Добавить продукт
        </Button>
      </form>
      <Divider className="mt-4" />
      <div className="py-10">
        <Products products={products} />
      </div>
    </section>
  );
};

export default AdminProducts;
