import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[150px] bg-gray">
      <div className="text-2xl text-white font-semibold text-center m-2">
        Shop
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className="m-2 text-white">Email: email@email.com</div>
        <div className="m-2 text-white">Телефон: 8 (982) 123-45-67</div>
      </div>
    </footer>
  );
};

export default Footer;
