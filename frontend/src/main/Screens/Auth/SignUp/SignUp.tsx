import { Button, Input, Spacer } from "@nextui-org/react";

const SignUp = () => {
  return (
    <form className="flex flex-col w-full sm:w-1/3 px-5 gap-2">
      <Input
        fullWidth
        variant="flat"
        size="lg"
        placeholder="Email"
        type="email"
        required
        // onChange={(e) => setEmail(e.target.value)}
      />
      <Spacer y={1.5} />
      <Input
        variant="flat"
        fullWidth
        size="lg"
        placeholder="Пароль"
        required
        // onChange={(e) => setPassword(e.target.value)}
      />
      <Spacer y={1.5} />
      <Input
        fullWidth
        variant="flat"
        size="lg"
        placeholder="Имя"
        type="email"
        required
        // onChange={(e) => setEmail(e.target.value)}
      />
      <Spacer y={1.5} />
      <Input
        variant="flat"
        fullWidth
        size="lg"
        placeholder="Фамилия"
        required
        // onChange={(e) => setPassword(e.target.value)}
      />
      <Spacer y={1.5} />
      <Input
        fullWidth
        variant="flat"
        size="lg"
        placeholder="Номер телефона"
        type="email"
        required
        // onChange={(e) => setEmail(e.target.value)}
      />
      <Spacer y={1.5} />
      <Input
        variant="flat"
        fullWidth
        size="lg"
        placeholder="Город"
        required
        // onChange={(e) => setPassword(e.target.value)}
      />
      <Spacer y={1.5} />
      <Button type="submit" color="primary">
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default SignUp;
