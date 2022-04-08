import { FC, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../states/UserProvider";

export const RequireAuth: FC = () => {
  const { userState } = useContext(UserContext);

  return userState.tokenData ? <Outlet /> : <Navigate to="/" replace />;
};
