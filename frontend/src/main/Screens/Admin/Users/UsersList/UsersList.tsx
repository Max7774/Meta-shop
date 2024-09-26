import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import UserItem from "./UserItem/UserItem";

const UsersList = () => {
  const { userList } = useAppSelector((state) => state.user);

  return (
    <div className="flex flex-wrap flex-row gap-3 w-full">
      {userList.map((user) => (
        <UserItem user={user} key={user.uuid} />
      ))}
    </div>
  );
};

export default UsersList;
