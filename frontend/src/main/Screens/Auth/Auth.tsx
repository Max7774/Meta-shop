import { Tabs, Tab } from "@nextui-org/react";
import { useAuthFormHeight } from "./useAuthFormHeight";
import { useState } from "react";
import { TTypeOfAuth } from "types/auth.types";
import SignProvider from "./SignProvider";
import { useParams } from "react-router-dom";

const Auth = () => {
  const { typeOfAuth } = useParams();
  useAuthFormHeight();
  const [typeOfAuthState, setTypeOfAuth] = useState<TTypeOfAuth>(
    typeOfAuth as TTypeOfAuth
  );

  return (
    <section
      className="flex justify-center flex-col gap-4 items-center"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      {typeOfAuthState !== "reset-password" && (
        <div className="w-full sm:w-1/3 px-5">
          <Tabs
            onSelectionChange={(e) => setTypeOfAuth(e as TTypeOfAuth)}
            size="lg"
            fullWidth
            aria-label="Tabs sizes"
          >
            <Tab key="register" title="Регистрация" />
            <Tab key="login" title="Авторизация" />
          </Tabs>
        </div>
      )}
      <SignProvider type={typeOfAuthState} setTypeOfAuth={setTypeOfAuth} />
    </section>
  );
};

export default Auth;
