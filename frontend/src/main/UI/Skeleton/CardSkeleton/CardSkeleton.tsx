import { Card, Skeleton } from "@nextui-org/react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CardSkeleton = () => {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 desktop:grid-cols-5">
      {arr.map((item) => (
        <Card key={item + "skeleton"} className="space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
              <div className="h-7 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardSkeleton;
