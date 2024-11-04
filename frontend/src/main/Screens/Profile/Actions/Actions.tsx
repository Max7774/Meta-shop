import ResetPasswordForm from "@Components/ResetPasswordForm/ResetPasswordForm";
import { Accordion, AccordionItem } from "@nextui-org/react";

const Actions = () => {
  //   const defaultContent =
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion variant="shadow">
      {/* <AccordionItem key="1" aria-label="Изменить почту" title="Изменить почту">
        {defaultContent}
      </AccordionItem> */}
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
