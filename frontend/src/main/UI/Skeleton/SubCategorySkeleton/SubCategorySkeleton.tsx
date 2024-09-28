import { Skeleton } from "@nextui-org/react";

const arr = [1, 2, 3, 4, 5, 6];

const SubCategorySkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      {arr.map(() => (
        <Skeleton className="rounded-2xl">
          <div className="h-44 bg-default-300"></div>
        </Skeleton>
      ))}
    </div>
  );
};

export default SubCategorySkeleton;
