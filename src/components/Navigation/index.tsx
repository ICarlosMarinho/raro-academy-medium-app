import { Link } from "react-router-dom";

export const Navigation = () => {
  const renderAuthLink = () => {
    return localStorage.getItem("auth_token") ? <Link to="/">Logout</Link> : <Link to="/login">Login</Link>;
  };

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/artigos">Meus Artigos</Link>
      <Link to="/artigos/novo">Novo Artigo</Link>
      {renderAuthLink()}
    </>
  );
};
