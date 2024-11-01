import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import UserItem from "./UserItem/UserItem";
import { useActions } from "@hooks/useActions";
import { useEffect } from "react";
import { useFilters } from "@hooks/useFilters";
import BlockSkeleton from "@UI/Skeleton/BlockSkeleton/BlockSkeleton";

const UsersList = () => {
  const { userList, isAdminUserLoading } = useAppSelector(
    (state) => state.user
  );
  const { getAllUsers } = useActions();
  const {
    users: { queryParams },
  } = useFilters();

  useEffect(() => {
    getAllUsers(queryParams);
  }, [getAllUsers, queryParams]);

  if (isAdminUserLoading) return <BlockSkeleton />;

  return (
    <div className="flex flex-wrap flex-row gap-3 w-full">
      {userList.map((user) => (
        <UserItem user={user} key={user.uuid} />
      ))}
    </div>
  );
};

export default UsersList;
