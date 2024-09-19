import { Tabs, Tab } from "@nextui-org/react";
import { useAuthFormHeight } from "./useAuthFormHeight";
import { useState } from "react";
import { TTypeOfAuth } from "./auth.types";
import SignProvider from "./SignProvider";

const Auth = () => {
  useAuthFormHeight();
  const [typeOfAuth, setTypeOfAuth] = useState<TTypeOfAuth>("login");

  return (
    <section
      className="flex justify-center flex-col gap-4 items-center"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      {typeOfAuth !== "reset-password" && (
        <div className="w-full sm:w-1/3 px-5">
          <Tabs
            onSelectionChange={(e: any) => setTypeOfAuth(e)}
            size="lg"
            fullWidth
            aria-label="Tabs sizes"
          >
            <Tab key="login" title="Авторизация" />
            <Tab key="register" title="Регистрация" />
          </Tabs>
        </div>
      )}
      <SignProvider type={typeOfAuth} setTypeOfAuth={setTypeOfAuth} />
    </section>
  );
};

export default Auth;
