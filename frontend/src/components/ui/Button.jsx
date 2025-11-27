import React from "react";

export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  const isDisabled = props.disabled;

  return (
    <button
      type={type}
      {...props}
      disabled={isDisabled}
      className={`px-5 py-3 w-full rounded-2xl font-semibold transition-all duration-300 select-none
        ${
          isDisabled
            ? "bg-[#e8e8e8] text-gray-400 cursor-not-allowed shadow-[inset_5px_5px_10px_#c8c8c8,_inset_-5px_-5px_10px_#ffffff]"
            : "bg-[#e8e8e8] text-gray-700 shadow-[5px_5px_10px_#bfbfbf,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#c8c8c8,_inset_-5px_-5px_10px_#ffffff] active:scale-[0.97]"
        }
        ${className}`}
    >
      {children}
    </button>
  );
}
