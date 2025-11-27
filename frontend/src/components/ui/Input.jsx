import React from "react";

export default function Input({ className = "", ...props }) {
  return (
    <input
     {...props}
      className={`w-full px-4 py-3 rounded-xl bg-bg text-gray-600
      shadow-[inset_4px_4px_8px_#c5c5e6,inset_-4px_-4px_8px_#ffffff]
      focus:ring-2 focus:ring-primary/40 outline-none transition-all duration-300
      ${className}`}
    />
  );
}
