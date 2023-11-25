import  { FC, PropsWithChildren } from "react";

const Box: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 text-white flex flex-col items-center">
      {children}
    </div>
  );
};

export default Box;
