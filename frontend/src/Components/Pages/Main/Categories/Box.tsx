import React, { FC, PropsWithChildren } from "react";

const Box: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-secondary rounded-xl p-4 text-white">{children}</div>
  );
};

export default Box;
