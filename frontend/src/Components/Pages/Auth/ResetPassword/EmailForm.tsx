import Button from "@UI/Button/Button";
import Heading from "@UI/Heading/Heading";
import TextField from "@UI/TextField/TextField";
import React from "react";

const EmailForm = () => {
  return (
    <div>
      <Heading className="capitalize text-center mb-4">
        Write your email to reset password
      </Heading>
      <TextField placeholder="Email" center />
      <div className="flex justify-center">
        <Button size="md" variant="secondary">
          Send
        </Button>
      </div>
    </div>
  );
};

export default EmailForm;
