import { Spinner } from "@nextui-org/react";

const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2">
      <Spinner color="primary" />
    </div>
  );
};

export default Loader;
