import { FC, useContext } from "react";
import { Link, LinkProps, useMatch } from "react-router-dom";
import { RequestContext } from "../../states/RequestProvider";
import { ComponentProps } from "./ActivableLink.model";

export const ActivableLink: FC<LinkProps & ComponentProps> = ({ to, children, type, ...rest }) => {
  const match = useMatch(to.toString());
  const { requestState } = useContext(RequestContext);

  return (
    <Link
      to={to}
      {...rest}
      className={`
        ${match && type !== "button" ? "border-raro-blue border-b-2" : ""} 
        ${requestState.loading ? "pointer-events-none" : ""} 
      `}>
      {children}
    </Link>
  );
};
