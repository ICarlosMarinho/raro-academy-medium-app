import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../services";
import { Button } from "../Button";
import { Input } from "../Input";
import { UserContext } from "../../states/UserProvider";
import { RequestContext } from "../../states/RequestProvider";
import { RequestResult } from "../RequestResult";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { userDispatch } = useContext(UserContext);
  const { requestState, requestDispatch } = useContext(RequestContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    requestDispatch({ type: "SET_DEFAULT" });
    requestDispatch({ type: "SET_LOADING", payload: true });

    authenticate(login, senha)
      .then((tokenData) => {
        userDispatch({ type: "SET_TOKEN_DATA", payload: tokenData });

        navigate("/artigos");
      })
      .catch((error) =>
        requestDispatch({ type: "SET_ERROR", payload: { hasError: true, message: error.message } })
      )
      .finally(() => requestDispatch({ type: "SET_LOADING", payload: false }));
  };

  const getHandleChange = (setValue: Dispatch<SetStateAction<string>>) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
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
        <RequestResult>
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
              <Button type="submit" disabled={requestState.loading}>
                Entrar
              </Button>
            </div>
          </form>
        </RequestResult>
      </div>
    </div>
  );
};
