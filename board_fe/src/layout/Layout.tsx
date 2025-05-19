import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="bg-slate-100">
      <Header />
      <div className="container mx-auto pt-4 pb-10 min-h-[calc(100vh-40px)]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
