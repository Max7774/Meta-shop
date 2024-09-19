import Heading from "@/main/UI/Heading";
import { Button, Input, Spacer } from "@nextui-org/react";

const Reset = () => {
  return (
    <>
      <Heading>Восстановление пароля</Heading>
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
        <Button type="submit" color="primary">
          Восстановление
        </Button>
      </form>
    </>
  );
};

export default Reset;
