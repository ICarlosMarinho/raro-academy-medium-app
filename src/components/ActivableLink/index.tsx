import { FC } from "react";
import { Link, LinkProps, useMatch } from "react-router-dom";

export const ActivableLink: FC<LinkProps> = ({ to, children, ...rest }) => {
  const match = useMatch(to.toString());
  const linkClass = match ? "border-raro-blue border-b-2" : undefined;
  return (
    <Link to={to} {...rest} className={linkClass}>
      {children}
    </Link>
  );
};
