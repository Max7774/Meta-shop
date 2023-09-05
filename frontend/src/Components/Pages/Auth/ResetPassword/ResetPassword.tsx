import Button from "@UI/Button/Button";
import Heading from "@UI/Heading/Heading";
import TextField from "@UI/TextField/TextField";
import React from "react";

const ResetPassword = () => {
  return (
    <section className="flex justify-center m-40">
      <div
        className="rounded shadow-2xl mins-w-2/5 p-10 bg-secondary"
        style={{ width: "600px" }}
      >
        <form>
          <Heading className="capitalize text-center mb-4 text-white">
            Reset password
          </Heading>
          <TextField placeholder="Old password" type="password" color="white" />
          <TextField placeholder="New password" type="password" color="white" />
          <TextField placeholder="Token" type="password" token color="white" />
          <div className="flex justify-center">
            <Button size="sm" variant="primary">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
