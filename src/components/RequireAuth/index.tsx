import { FC, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getTokenDataFromStorage } from "../../helpers";

export const RequireAuth: FC = () => {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    setAuthenticated(getTokenDataFromStorage() !== null);
  }, []);

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};
