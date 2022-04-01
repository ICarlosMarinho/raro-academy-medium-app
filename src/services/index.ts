import axios, { AxiosError } from "axios";
import { AuthResponseData } from "./services.model";

export const authenticate = (login: string, senha: string) => {
  return axios
    .post<AuthResponseData>(`${process.env.REACT_APP_API_URL}/auth/login`, {
      login,
      senha
    })
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      let message;

      if (error.response?.status === 401) {
        message = "Usuário ou senha inválidos";
      } else {
        message = "Erro ao autenticar, verifique sua conexão ou entre em contato com o administrador";
      }

      throw new Error(message);
    });
};
