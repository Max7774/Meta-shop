import { AuthUI } from "@UI/AuthUI";
import { useProfile } from "@hooks/useProfile";
// import Search from "./SearchField/Search";
import { useAuth } from "@hooks/auth-hooks/useAuth";
import { useActions } from "@hooks/useActions";
import { CiLogin } from "react-icons/ci";
import styles from "./NavBar.module.scss";
import { MdFavoriteBorder } from "react-icons/md";

const NavBar = () => {
  const { profile } = useProfile();
  const { user } = useAuth();
  const { openModal } = useActions();
  return (
    <>
      <header className="bg-secondary text-white py-2 px-3 max-[400px]:py-3">
        {user === null ? (
          <div className="flex flex-row justify-between items-center">
            <div className="text-2xl text-white font-semibold">Shop</div>
            <div className="flex flex-row justify-center items-center">
              <div className="px-2">
                <MdFavoriteBorder
                  size={30}
                  onClick={() => openModal("login")}
                  className={styles["login"]}
                />
              </div>
              <div className="px-2">
                <CiLogin
                  size={35}
                  onClick={() => openModal("login")}
                  className={styles["login"]}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center">
            <div className="text-2xl text-white font-semibold">Shop</div>
            {profile.isLoading ? (
              <AuthUI.Loader isLoading size="sm" color="white" />
            ) : (
              <div className="flex flex-row justify-end items-center">
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/file-upload/${
                    profile.profile.user.avatarPath === ""
                      ? "default-avatar.png"
                      : profile.profile.user.avatarPath
                  }`}
                  width={43}
                  height={43}
                  alt="..."
                  className="rounded-full border-primary border border-solid animate-opacity"
                />
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default NavBar;
