import Heading from "@UI/Heading";
import ClaimForm from "./ClaimForm/ClaimForm";

const Claim = () => {
  return (
    <section
      className="flex justify-center flex-col gap-4 items-center"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      <Heading className="text-center">Заявка</Heading>
      <ClaimForm />
    </section>
  );
};

export default Claim;
