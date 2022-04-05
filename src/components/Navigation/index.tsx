import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../states/UserProvider";
import { ActivableLink } from "../ActivableLink";

export const Navigation = () => {
  const { userState, userDispatch } = useContext(UserContext);

  const handleClick = () => {
    userDispatch({ type: "SET_TOKEN_DATA", payload: null });
  };

  const renderAuthLink = () => {
    return userState.tokenData ? (
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
      {userState.tokenData && (
        <>
          <ActivableLink to="/artigos">Meus Artigos</ActivableLink>
          <ActivableLink to="/artigos/novo">Novo Artigo</ActivableLink>
        </>
      )}
      {renderAuthLink()}
    </>
  );
};
