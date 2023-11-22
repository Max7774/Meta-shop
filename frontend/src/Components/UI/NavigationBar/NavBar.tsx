import { AuthUI } from "@UI/AuthUI";
import { useProfile } from "@hooks/useProfile";

const NavBar = () => {
  const { profile } = useProfile();
  return (
    <>
      <header className="bg-secondary text-white py-2 px-3 max-[400px]:py-3">
        {profile.isLoading ? (
          <AuthUI.Loader isLoading size="sm" color="white" />
        ) : (
          <div className="flex flex-row justify-between items-center">
            <div className="text-2xl text-white font-semibold">Shop</div>
            <div className="flex flex-row justify-end items-center">
              <div className="mr-2">{profile.profile.user.first_name}</div>
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
          </div>
        )}
      </header>
    </>
  );
};

export default NavBar;
