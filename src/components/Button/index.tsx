import React, { ButtonHTMLAttributes } from "react";

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`
        w-full mt-6 tracking-widest
        border-b-blue-600 bg-blue-500 py-3 text-white font-bold
        hover:bg-blue-400 active:not:disabled:translate-y-[0.125rem] active:not:disabled:border-b-blue-400
        disabled:opacity-50 disabled:cursor-default
      `}>
      {children}
    </button>
  );
};
