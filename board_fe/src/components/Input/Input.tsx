import React from "react";

const Input = (props) => {
  return (
    <input
      className="border border-slate-500 rounded-lg p-2 w-full"
      type={props.type ?? "text"}
      {...props}
    />
  );
};

export default Input;
