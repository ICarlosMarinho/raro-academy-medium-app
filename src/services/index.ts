import axios, { AxiosError } from "axios";
import { parseArticle } from "../helpers";
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

export const getArticles = (titulo = "") => {
  const params = titulo.length ? { titulo } : {};

  return axios
    .get<Article[]>(`${process.env.REACT_APP_API_URL}/artigos`, {
      params
    })
    .then(({ data }) => data.map((article) => parseArticle(article)))
    .catch((_error: AxiosError) => {
      throw new Error(
        "Erro ao buscar artigos, verifique sua conexão ou entre em contato com o administrador"
      );
    });
};
