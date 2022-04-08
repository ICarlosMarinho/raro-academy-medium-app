import { useContext } from "react";
import { UserContext } from "../../states/UserProvider";
import { ActivableLink } from "../ActivableLink";

export const Navigation = () => {
  const { userState, userDispatch } = useContext(UserContext);

  const handleClick = () => {
    userDispatch({ type: "SET_TOKEN_DATA", payload: null });
  };

  const renderAuthLink = () => {
    return userState.tokenData ? (
      <ActivableLink type="button" to="/" onClick={handleClick}>
        Sair
      </ActivableLink>
    ) : (
      <ActivableLink type="button" to="/login">
        Login
      </ActivableLink>
    );
  };

  return (
    <>
      <ActivableLink type="link" to="/">
        Home
      </ActivableLink>
      {userState.tokenData && (
        <>
          <ActivableLink type="link" to="/artigos">
            Meus Artigos
          </ActivableLink>
          <ActivableLink type="link" to="/artigos/novo">
            Novo Artigo
          </ActivableLink>
        </>
      )}
      {renderAuthLink()}
    </>
  );
};
