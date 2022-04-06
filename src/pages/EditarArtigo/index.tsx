import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleForm } from "../../components/ArticleForm";
import { Message } from "../../components/Message";
import { RequestResult } from "../../components/RequestResult";
import { getArticle, updateArticle, createArticle } from "../../services";
import { RequestContext } from "../../states/RequestProvider";
import { UserContext } from "../../states/UserProvider";

export const EditarArquivoPage = () => {
  const { id } = useParams();
  const { requestDispatch } = useContext(RequestContext);
  const { userState } = useContext(UserContext);
  const [article, setArticle] = useState<Article | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (id) {
      requestDispatch({ type: "SET_DEFAULT" });
      requestDispatch({ type: "SET_LOADING", payload: true });

      getArticle(parseInt(id))
        .then((result) => setArticle(result))
        .catch((error) =>
          requestDispatch({ type: "SET_ERROR", payload: { message: error.message, hasError: true } })
        )
        .finally(() => requestDispatch({ type: "SET_LOADING", payload: false }));
    }
  }, [id]);

  const onSubmit = (article: Article) => {
    requestDispatch({ type: "SET_DEFAULT" });
    requestDispatch({ type: "SET_LOADING", payload: true });
    setSuccessMessage("");

    if (id) {
      const { id, titulo, conteudo, resumo, imagem } = article;

      updateArticle(id, titulo, imagem, resumo, conteudo as string, userState.tokenData)
        .then((message) => setSuccessMessage(message))
        .catch((error) =>
          requestDispatch({ type: "SET_ERROR", payload: { message: error.message, hasError: true } })
        )
        .finally(() => requestDispatch({ type: "SET_LOADING", payload: false }));
    } else {
      const { titulo, conteudo, resumo, imagem } = article;

      createArticle(titulo, imagem, resumo, conteudo as string, userState.tokenData)
        .then((message) => setSuccessMessage(message))
        .catch((error) =>
          requestDispatch({ type: "SET_ERROR", payload: { message: error.message, hasError: true } })
        )
        .finally(() => requestDispatch({ type: "SET_LOADING", payload: false }));
    }
  };

  const renderSuccessMessage = () => {
    return successMessage ? <Message variant="info">{successMessage}</Message> : null;
  };

  return (
    <div className="items-center justify-center m-10">
      <RequestResult>
        <ArticleForm article={article} onSubmit={onSubmit} />
        {renderSuccessMessage()}
      </RequestResult>
    </div>
  );
};
