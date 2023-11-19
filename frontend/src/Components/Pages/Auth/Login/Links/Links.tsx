import { FC } from "react";
import { LinksProps } from "./links.interface";
import { Link } from "react-router-dom";

const Links: FC<LinksProps> = ({ setIsOpen, isModalOpen }) => {
  return (
    <>
      <div
        onClick={() => setIsOpen(!isModalOpen)}
        className="text-center text-white hover:text-primary transition-colors duration-200 hover:cursor-pointer"
      >
        Forgot your password?
      </div>
      <div className="text-center text-gray">
        First time on the site?
        <Link
          className="text-white hover:text-primary transition-colors duration-200"
          to="/register"
        >
          {" "}
          Register
        </Link>
      </div>
    </>
  );
};

export default Links;
