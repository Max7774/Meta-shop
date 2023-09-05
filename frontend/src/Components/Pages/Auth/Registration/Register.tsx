import Button from "@UI/Button/Button";
import Heading from "@UI/Heading/Heading";
import TextField from "@UI/TextField/TextField";

const Register = () => {
  return (
    <section className="flex justify-center m-20 max-[420px]:mt-2 mr-2 ml-2">
      <div
        className="rounded shadow-2xl mins-w-2/5 p-10 bg-secondary"
        style={{ width: "600px" }}
      >
        <form>
          <Heading className="capitalize text-center mb-4 text-white">
            Registration
          </Heading>
          <div className="flex flex-col">
            <div>
              <TextField placeholder="First name" color="white" />
              <TextField placeholder="Second name" color="white" />
              <TextField placeholder="Phone number" color="white" />
              <TextField placeholder="Birthday" type="date" color="white" />
            </div>
            <div>
              <TextField placeholder="Email" color="white" />
              <TextField placeholder="Password" type="password" color="white" />
              <TextField
                placeholder="Repeat your password"
                type="password"
                color="white"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button size="sm" variant="primary">
              Register
            </Button>
          </div>
          <div className="text-center text-white">
            Already have an account?
            <a
              className="text-gray hover:text-primary transition-colors duration-200"
              href="/"
            >
              {" "}
              Login
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
