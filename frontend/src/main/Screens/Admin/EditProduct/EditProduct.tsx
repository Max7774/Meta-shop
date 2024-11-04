/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useActions } from "@hooks/useActions";
import { useProducts } from "@hooks/useProducts";
import {
  Input,
  Button,
  Textarea,
  Select,
  Image,
  SelectItem,
  Checkbox,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import Heading from "@UI/Heading";
import { TProductCreateForm } from "@/types/TProduct";
import { IoClose } from "react-icons/io5";
import { useCategory } from "@hooks/useCategory";
import { toast } from "react-toastify";
import { getImageUrl } from "@utils/getImageUrl";
import { unitofmeasurementData } from "@/const/unitofmeasurement";
import DeleteAction from "./DeleteAction";
import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { ERoles } from "@enums/ERoles";

const excludedRoles = [ERoles.COMPANY];

const EditProduct = () => {
  const { productSlug } = useParams();
  const {
    getProductBySlug,
    updateProduct,
    deleteProductImage,
    getAllCompanies,
  } = useActions();
  const { product, isLoading } = useProducts();
  const { categories } = useCategory();

  const { companies } = useAppSelector((state) => state.company);
  const { role, companyUuid } = useAppSelector((state) => state.user.profile);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    watch,
  } = useForm<TProductCreateForm>();

  const categoryUuid = watch("categoryUuid");

  // Состояние для предварительного просмотра изображений
  const [previewImages, setPreviewImages] = useState<string[]>(
    product?.images || []
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Обработка выбора изображений
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    console.log(files);
    files.forEach((file) => {
      console.log(file.size);
      if (file.size > 1024) {
        toast.error("Размер файла должен быть меньше 2MB");
        return "Размер файла должен быть меньше 2MB";
      }
    });

    // Проверка на количество файлов
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

  const onSubmit: SubmitHandler<TProductCreateForm> = async (data) => {
    const updatedData: TProductCreateForm = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      discount: Number(data.discount),
      inStock: data.inStock,
      subcategoryUuid: data.subcategoryUuid,
      categoryUuid: data.categoryUuid,
      companyUuid: companyUuid || data.companyUuid || "",
      unitofmeasurement: data?.unitofmeasurement || "",
    };

    const result: any = await updateProduct({
      data: updatedData,
      uuid: product?.uuid || "",
      images: selectedFiles,
    });

    if (result.type === "products/updateProduct/fulfilled") {
      navigate(`/product/${product?.slug}`);
    } else {
      toast.error("Ошибка редактирования продукта");
    }
  };

  const handleSubCategoryChange = (subcategoryUuid: string) => {
    setValue("subcategoryUuid", subcategoryUuid);
  };

  const handleCategoryChange = (categoryUuid: string) => {
    setValue("categoryUuid", categoryUuid);
  };

  useEffect(() => {
    getProductBySlug(productSlug || "");
  }, [productSlug]);

  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);

  // Добавляем useEffect для обновления формы и изображений
  useEffect(() => {
    if (product) {
      // Обновляем значения формы
      reset({
        name: product.name || "",
        description: product.description || "",
        price:
          product.company.find((el) => el.companyUuid === companyUuid)?.price ||
          0,
        inStock: product.inStock,
        discount:
          product.company.find((el) => el.companyUuid === companyUuid)
            ?.discount || 0,
        categoryUuid: product?.subcategory?.category?.uuid || "",
        subcategoryUuid: product?.subcategory?.uuid || "",
        unitofmeasurement: product.unitofmeasurement || "",
        companyUuid:
          product.company.find((el) => el.companyUuid === companyUuid)
            ?.companyUuid || product.company[0]?.companyUuid,
      });

      // Обновляем previewImages
      setPreviewImages(product.images);

      // Очищаем выбранные файлы
      setSelectedFiles([]);
    }
  }, [product, reset]);

  if (isLoading || !product) {
    return <div>Загрузка...</div>;
  }

  return (
    <section>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={"/"}>{"Главная"}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={`/categories/${product?.subcategory.category?.slug}`}>
            {product?.subcategory?.category?.name}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link
            to={`/categories/${product?.subcategory.category?.slug}/${product?.subcategory?.slug}`}
          >
            {product?.subcategory?.name}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={`/product/${product?.slug}`}>{product?.name}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link
            to={`/${product?.subcategory?.slug}`}
          >{`Редактирование: ${product?.name}`}</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
      <Heading>Редактирование продукта</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                isDisabled={!!companyUuid}
                label="Название продукта"
                placeholder="Введите название продукта"
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Textarea
                isDisabled={!!companyUuid}
                label="Описание продукта"
                placeholder="Введите описание продукта"
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            rules={{
              min: { value: 0, message: "Цена не может быть отрицательной" },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                isDisabled={!companyUuid}
                type="number"
                label="Цена"
                placeholder="Введите цену"
                onChange={onChange}
                value={value?.toString()}
              />
            )}
          />

          <Controller
            control={control}
            name="inStock"
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-row gap-2">
                <Checkbox
                  onValueChange={(isSelected) => onChange(isSelected)}
                  isSelected={value}
                />
                <p className="text-default-500">Наличие</p>
              </div>
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
                isDisabled={!!companyUuid}
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

          <Controller
            name="categoryUuid"
            control={control}
            render={({ field }) => (
              <Select
                isDisabled={!!companyUuid}
                label="Категория"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  handleCategoryChange(selectedKey);
                }}
                placeholder="Выберите категорию"
              >
                {categories.map((item) => (
                  <SelectItem key={item.uuid} value={item.uuid}>
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            name="subcategoryUuid"
            control={control}
            render={({ field }) => (
              <Select
                isDisabled={!!companyUuid}
                label="Подкатегория"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  handleSubCategoryChange(selectedKey);
                }}
                placeholder="Выберите подкатегорию"
              >
                {(
                  categories.find(
                    ({ slug }) => product.subcategory.category?.slug === slug
                  )?.subcategory ||
                  categories.find((el) => el.uuid === categoryUuid)
                    ?.subcategory ||
                  []
                ).map((item) => (
                  <SelectItem key={item.uuid} value={item.uuid}>
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="companyUuid"
            rules={{ required: !companyUuid && "Выберите фирму" }}
            render={({ field, fieldState: { error } }) => (
              <Select
                isDisabled={excludedRoles.includes(role)}
                label="Фирма поставщик-производитель"
                placeholder="Выберите фирму"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  field.onChange(selectedKey);
                }}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                fullWidth
              >
                {companies.map(({ uuid, name }) => (
                  <SelectItem key={uuid}>{name}</SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            name="discount"
            control={control}
            rules={{
              min: { value: 0, message: "Скидка не может быть отрицательной" },
              max: { value: 100, message: "Скидка не может превышать 100%" },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                isDisabled={!companyUuid}
                label="Скидка (%)"
                placeholder="Введите скидку"
                onChange={onChange}
                value={value?.toString()}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
        </div>

        <div className="py-4">
          <div className="flex flex-wrap gap-2">
            {previewImages.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={!image.includes("blob") ? getImageUrl(image) : image}
                  width={100}
                  height={100}
                  alt={`Изображение ${index + 1}`}
                />
                {!companyUuid && (
                  <button
                    type="button"
                    onClick={() => {
                      deleteProductImage({
                        productUuid: product.uuid || "",
                        filename: image,
                      });
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
                )}
              </div>
            ))}
          </div>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <Input
                isDisabled={!!companyUuid}
                className="pt-3"
                type="file"
                label="Загрузить новые изображения"
                accept="image/*"
                multiple
                onChange={(e) => {
                  handleImageChange(e);
                  field.onChange(e.target.files);
                }}
              />
            )}
          />
        </div>

        <Button fullWidth size="lg" type="submit" color="primary">
          Сохранить изменения
        </Button>
        <DeleteAction productUuid={product.uuid} />
      </form>
    </section>
  );
};

export default EditProduct;
