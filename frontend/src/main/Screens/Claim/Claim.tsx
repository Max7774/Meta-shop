import Heading from "@UI/Heading";
import ClaimForm from "./ClaimForm/ClaimForm";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Claim = () => {
  const navigate = useNavigate();
  return (
    <section
      className="relative flex justify-center flex-col gap-4 items-center"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      <Heading className="text-center">Заявка</Heading>
      <ClaimForm />
      <div className="absolute top-2 left-2">
        <Button variant="shadow" color="primary" onClick={() => navigate("/")}>
          На главную
        </Button>
      </div>
    </section>
  );
};

export default Claim;
