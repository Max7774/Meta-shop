import { useProfile } from "@hooks/useProfile";
import React from "react";

const NavBar = () => {
  const { profile } = useProfile();
  console.log("render");
  return (
    <>
      <header className="bg-secondary m-3 text-white rounded-xl py-4 px-3 max-[400px]:py-3">
        {profile.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-row justify-end">
            {profile.profile.user.first_name}
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/file-upload/${profile.profile.user.avatarPath}`}
              width={50}
              height={50}
              alt="..."
            />
          </div>
        )}
      </header>
    </>
  );
};

export default NavBar;
