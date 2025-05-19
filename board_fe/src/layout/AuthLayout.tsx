import React from "react";
import Header from "./Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full h-[100vh] items-center justify-center bg-slate-100">
      <div className="p-8 min-w-[400px] rounded-lg bg-white">{children}</div>
    </div>
  );
};

export default Layout;
