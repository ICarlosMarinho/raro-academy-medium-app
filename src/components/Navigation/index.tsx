import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearTokenDataFromStorage, getTokenDataFromStorage } from "../../helpers";
import { ActivableLink } from "../ActivableLink";

export const Navigation = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(getTokenDataFromStorage() !== null);
  }, []);

  const handleClick = () => {
    clearTokenDataFromStorage();
    setAuthenticated(false);
  };

  const renderAuthLink = () => {
    return authenticated ? (
      <Link to="/" onClick={handleClick}>
        Sair
      </Link>
    ) : (
      <Link to="/login">Login</Link>
    );
  };

  return (
    <>
      <ActivableLink to="/">Home</ActivableLink>
      {authenticated && (
        <>
          <ActivableLink to="/artigos">Meus Artigos</ActivableLink>
          <ActivableLink to="/artigos/novo">Novo Artigo</ActivableLink>
        </>
      )}
      {renderAuthLink()}
    </>
  );
};
