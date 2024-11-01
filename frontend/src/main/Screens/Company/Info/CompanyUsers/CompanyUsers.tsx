import { useAppSelector } from "@hooks/redux-hooks/reduxHooks";
import UserItem from "@Screens/Admin/Users/UsersList/UserItem/UserItem";

const CompanyUsers = () => {
  const { users } = useAppSelector((state) => state.company.info);

  return (
    <div>
      {users?.map((user) => (
        <UserItem user={user} key={user.uuid} />
      ))}
    </div>
  );
};

export default CompanyUsers;
