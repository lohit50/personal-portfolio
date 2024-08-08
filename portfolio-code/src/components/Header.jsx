import React from "react";

const Header = () => {
  return (
    <header className="flex items-center space-x-8 header-tab border rounded-lg border-black">
      <img src="/svg/logo-new.svg" className="w-11 h-11" alt="Logo" />
      <h1 className="text-4xl">Lohit</h1>
    </header>
  );
};

export default Header;
