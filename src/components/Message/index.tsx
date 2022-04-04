import { FC } from "react";
import { ComponentProps } from "./Message.model";

export const Message: FC<ComponentProps> = ({ children, variant }) => {
  const color = variant === "error" ? "text-red-500" : "text-raro-blue";
  return <h2 className={`flex justify-center font-bold mt-5 ${color}`}>{children}</h2>;
};
