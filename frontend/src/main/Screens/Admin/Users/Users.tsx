import UsersList from "./UsersList/UsersList";
import Heading from "@UI/Heading";
import Search from "@Components/Search/Search";

const Users = () => {
  return (
    <section>
      <Heading>Все пользователи</Heading>
      <Search pageKey="users" className="mb-4" />
      <UsersList />
    </section>
  );
};

export default Users;
