import React from "react";

const Card = ({ children, className = "", onClick = () => {} }) => {
  return (
    <div className={`rounded-lg p-4 bg-white ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
