import axios, { AxiosError } from "axios";
import { parseArticle } from "../helpers";

export const messages = {
  success: {
    delete: "Artigo excluído com sucesso",
    update: "Artigo atualizado com sucesso",
    create: "Artigo criado com sucesso"
  },
  error: {
    authentication: "Usuário ou senha inválidos",
    system: "Um erro inesperado ocorreu, verifique sua conexão ou entre em contato com o suporte",
    authorization: "Operação não permitida, faça login e tente novamente"
  }
};

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
      let message = error.response?.status === 401 ? messages.error.authentication : messages.error.system;

      throw new Error(message);
    });
};

export const getArticles = (tokenData: TokenData | null, titulo = "") => {
  const params = titulo.length ? { titulo } : undefined;
  const headers = tokenData ? { Authorization: `Bearer ${tokenData.token}` } : undefined;
  const url = `${process.env.REACT_APP_API_URL}/artigos/${tokenData ? "meus-artigos" : ""}`;
  return axios
    .get<Article[]>(url, { headers, params })
    .then(({ data }) => data.map((article) => parseArticle(article)))
    .catch((error: AxiosError) => {
      let message = error.response?.status === 401 ? messages.error.authorization : messages.error.system;

      throw new Error(message);
    });
};

export const getArticle = (id: number) => {
  return axios
    .get<Article>(`${process.env.REACT_APP_API_URL}/artigos/${id}`)
    .then(({ data }) => parseArticle(data))
    .catch((_error: AxiosError) => {
      throw new Error(messages.error.system);
    });
};

export const createArticle = (
  titulo: string,
  imagem: string,
  resumo: string,
  conteudo: string,
  tokenData: TokenData | null
) => {
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
    .then(() => messages.success.create)
    .catch((error: AxiosError) => {
      let message = error.response?.status === 401 ? messages.error.authorization : messages.error.system;

      throw new Error(message);
    });
};

export const updateArticle = (
  id: number,
  titulo: string,
  imagem: string,
  resumo: string,
  conteudo: string,
  tokenData: TokenData | null
) => {
  const headers = tokenData ? { Authorization: `Bearer ${tokenData.token}` } : undefined;
  const data = {
    titulo,
    imagem,
    resumo,
    conteudo
  };

  return axios
    .patch(`${process.env.REACT_APP_API_URL}/artigos/${id}`, data, {
      headers
    })
    .then(() => messages.success.update)
    .catch((error: AxiosError) => {
      let message = error.response?.status === 401 ? messages.error.authorization : messages.error.system;

      throw new Error(message);
    });
};

export const deleteArticle = (id: number, tokenData: TokenData | null) => {
  const headers = tokenData ? { Authorization: `Bearer ${tokenData.token}` } : undefined;

  return axios
    .delete(`${process.env.REACT_APP_API_URL}/artigos/${id}`, {
      headers
    })
    .then(() => messages.success.delete)
    .catch((error: AxiosError) => {
      let message = error.response?.status === 401 ? messages.error.authorization : messages.error.system;

      throw new Error(message);
    });
};
