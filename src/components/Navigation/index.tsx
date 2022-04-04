import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearTokenDataFromStorage, getTokenDataFromStorage } from "../../helpers";

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
      <Link to="/">Home</Link>
      {authenticated && (
        <>
          <Link to="/artigos">Meus Artigos</Link>
          <Link to="/artigos/novo">Novo Artigo</Link>
        </>
      )}
      {renderAuthLink()}
    </>
  );
};
