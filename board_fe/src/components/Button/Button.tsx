import React, { useMemo } from "react";

const Button = ({
  children,
  onClick = () => {},
  disabled = false,
  color = "blue",
  className = "",
}) => {
  const colorStyle = useMemo(() => {
    switch (color) {
      case "blue":
        return "bg-blue-500 hover:bg-blue-400 text-white hover:cursor-pointer";
      case "red":
        return "bg-red-500 hover:bg-red-400 text-white hover:cursor-pointer";
    }
  }, [color]);
  return (
    <button
      className={`p-2 rounded-md block ${className} ${
        !disabled
          ? colorStyle
          : "bg-slate-300 text-white hover:cursor-not-allowed h-fit w-fit"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
