import { AuthUI } from "@UI/AuthUI";
import { useActions } from "@hooks/useActions";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterType } from "types/user.type";
import VerifyAccount from "./VerifyAccount/VerifyAccount";
import ProgressBar from "./ProgressBar/ProgressBar";
import { registrationOptions } from "./options";
import { RegisterLinks } from "@Pages/Auth/Links/Links";
import { useAuthRedirect } from "@hooks/auth-hooks/useAuthRedirect";

const Register = () => {
  useAuthRedirect("register");
  const [isModalOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { register } = useActions();
  const form = useForm<RegisterType>();
  const registerUser: SubmitHandler<RegisterType> = async (data) => {
    try {
      setLoading(true);
      await register(data);
      form.reset();
      setOpen(!isModalOpen);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mins-w-2/5 h-[700px] overflow-auto bg-secondary">
        <form onSubmit={form.handleSubmit(registerUser)}>
          <AuthUI.Heading className="capitalize text-center mb-4 text-white">
            Регистрация
          </AuthUI.Heading>
          <ProgressBar setStep={setStep} step={step} />
          <div className="flex flex-col">
            <AuthUI.AuthFieldsGroup
              options={registrationOptions}
              register={form.register}
              errors={form.formState.errors}
              step={step}
            />
            {step === 1 ? (
              <div className="flex justify-center">
                <AuthUI.Button
                  isLoading={isLoading}
                  size="sm"
                  onClick={() => setStep(2)}
                  variant="primary"
                >
                  Следующий шаг
                </AuthUI.Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <AuthUI.Button
                  isLoading={isLoading}
                  type="submit"
                  size="sm"
                  variant="primary"
                >
                  Зарегистрироваться
                </AuthUI.Button>
              </div>
            )}
          </div>
        </form>
        <RegisterLinks />
      </div>
      <AuthUI.Modal
        isOpen={isModalOpen}
        closeModal={() => setOpen(!isModalOpen)}
      >
        <VerifyAccount />
      </AuthUI.Modal>
    </>
  );
};

export default Register;
