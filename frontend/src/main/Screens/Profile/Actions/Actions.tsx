import ResetPasswordForm from "@Components/ResetPasswordForm/ResetPasswordForm";
import { Accordion, AccordionItem } from "@nextui-org/react";

const Actions = () => {
  return (
    <Accordion variant="shadow">
      <AccordionItem
        key="1"
        aria-label="Изменить пароль"
        title="Изменить пароль"
      >
        <div className="w-full">
          <ResetPasswordForm />
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default Actions;
