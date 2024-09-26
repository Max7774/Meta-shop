import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import { useActions } from "@hooks/useActions";
import BlockSkeleton from "@UI/Skeleton/BlockSkeleton/BlockSkeleton";
import { useEffect } from "react";
import UsersList from "./UsersList/UsersList";

const Users = () => {
  const { getAllUsers } = useActions();
  const { isAdminUserLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (isAdminUserLoading) return <BlockSkeleton />;

  return (
    <section>
      <UsersList />
    </section>
  );
};

export default Users;
