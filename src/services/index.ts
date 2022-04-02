import axios, { AxiosError } from "axios";
import { getBase64, getTokenDataFromStorage, parseArticle } from "../helpers";

export const authenticate = (login: string, senha: string): Promise<TokenData> => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      login,
      senha
    })
    .then(({ data }) => ({
      userId: data.id,
      token: data.access_token
    }))
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

export const getMyArticles = (titulo = "") => {
  const tokenData = getTokenDataFromStorage();
  const headers = tokenData ? { Authorization: `Bearer ${tokenData.token}` } : undefined;

  const params = titulo.length ? { titulo } : {};

  return axios
    .get<Article[]>(`${process.env.REACT_APP_API_URL}/artigos/meus-artigos`, {
      headers,
      params
    })
    .then(({ data }) => data.map((article) => parseArticle(article)))
    .catch((error: AxiosError) => {
      let message;

      if (error.response?.status === 401) {
        message = "Operação não permitida, faça login e tente novamente";
      } else {
        message = "Erro ao autenticar, verifique sua conexão ou entre em contato com o administrador";
      }

      throw new Error(message);
    });
};

export const getArticle = (id: number) => {
  return axios
    .get<Article>(`${process.env.REACT_APP_API_URL}/artigos/${id}`)
    .then(({ data }) => parseArticle(data))
    .catch((_error: AxiosError) => {
      throw new Error("Erro ao buscar artigo, verifique sua conexão ou entre em contato com o administrador");
    });
};

export const saveArticle = (titulo: string, imagem: string, resumo: string, conteudo: string) => {
  const tokenData = getTokenDataFromStorage();
  const headers = tokenData ? { Authorization: `Bearer ${tokenData.token}` } : undefined;
  const data = {
    titulo,
    imagem,
    resumo,
    conteudo
  };

  return axios
    .post(`${process.env.REACT_APP_API_URL}/artigos`, data, {
      headers
    })
    .then(() => "Artigo salvo com sucesso")
    .catch((error: AxiosError) => {
      let message;

      if (error.response?.status === 401) {
        message = "Operação não permitida, faça login e tente novamente";
      } else {
        message = "Erro ao salvar artigo, verifique sua conexão ou entre em contato com o administrador";
      }

      throw new Error(message);
    });
};
