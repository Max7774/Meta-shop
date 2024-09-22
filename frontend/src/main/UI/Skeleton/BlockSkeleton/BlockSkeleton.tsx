import { Skeleton } from "@nextui-org/react";

const arr = [1, 2, 3, 4];

const BlockSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 px-5">
      {arr.map((item) => (
        <Skeleton key={item} className="w-full rounded-lg">
          <div
            key={item + "skeleton"}
            className="h-7 w-full rounded-lg bg-default-300"
          ></div>
        </Skeleton>
      ))}
    </div>
  );
};

export default BlockSkeleton;
