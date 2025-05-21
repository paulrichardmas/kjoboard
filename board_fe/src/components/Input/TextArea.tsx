import React from "react";

const TextArea = (props) => {
  return (
    <textarea
      className="border border-slate-500 rounded-lg p-2 w-full"
      type={props.type ?? "text"}
      rows={props.rows ?? 4}
      {...props}
    />
  );
};

export default TextArea;
