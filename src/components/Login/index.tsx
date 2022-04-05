import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../services";
import { Button } from "../Button";
import { Input } from "../Input";
import { Message } from "../Message";
import { UserContext } from "../../states/UserProvider";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState<RequestError>({ hasError: false, message: "" });
  const navigate = useNavigate();
  const { userDispatch } = useContext(UserContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setRequestError({ hasError: false, message: "" });

    authenticate(login, senha)
      .then((tokenData) => {
        userDispatch({ type: "SET_TOKEN_DATA", payload: tokenData });
        setLoading(false);
        navigate("/artigos");
      })
      .catch((error) => {
        setLoading(false);
        setRequestError({ hasError: true, message: error.message });
      });
  };

  const getHandleChange = (setValue: Dispatch<SetStateAction<string>>) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
  };

  const renderError = () => {
    return requestError.hasError ? <Message variant="error">{requestError.message}</Message> : null;
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://rarolabs.com.br/assets/logo-cae9beb1976500005b5e29dea19bdaa2761082232703a16beb71ffd2117014e5.png"
            alt="Workflow"
          />
        </div>
        <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-5">
              <Input
                type="text"
                id="login"
                label="Login"
                placeholder="login"
                required
                value={login}
                onChange={getHandleChange(setLogin)}
              />
            </div>

            <div className="mt-5">
              <Input
                type="password"
                id="senha"
                label="senha"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                required
                value={senha}
                onChange={getHandleChange(setSenha)}
              />
            </div>
          </div>
          <div>
            <Button type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </Button>
          </div>
          {renderError()}
        </form>
      </div>
    </div>
  );
};
