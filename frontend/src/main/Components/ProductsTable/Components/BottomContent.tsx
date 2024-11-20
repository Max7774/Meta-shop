import { useActions } from "@hooks/useActions";
import { useFilters } from "@hooks/useFilters";
import { useProducts } from "@hooks/useProducts";
import { Button, Pagination } from "@nextui-org/react";
import { memo, useCallback, useMemo } from "react";

const BottomContent = () => {
  const { length } = useProducts();
  const {
    products: {
      pageFilters: { page, perPage },
    },
  } = useFilters();
  const { updatePageFilters } = useActions();

  const changePage = useCallback(
    (page: number) => {
      updatePageFilters({
        pageKey: "products",
        perPage: perPage,
        page,
      });
    },
    [updatePageFilters, perPage]
  );

  const pages = useMemo(() => {
    return Math.ceil(length / perPage);
  }, [length, perPage]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      changePage(page + 1);
    }
  }, [page, pages, changePage]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      changePage(page - 1);
    }
  }, [page, changePage]);

  if (pages <= 0) {
    return null;
  }

  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        Всего {length} продуктов
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={changePage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onPreviousPage}
        >
          Назад
        </Button>
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onNextPage}
        >
          Вперед
        </Button>
      </div>
    </div>
  );
};

export default memo(BottomContent);
