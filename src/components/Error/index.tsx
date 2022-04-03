import { FC } from "react";

export const Error: FC = ({ children }) => (
  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
    {children}
  </span>
);
