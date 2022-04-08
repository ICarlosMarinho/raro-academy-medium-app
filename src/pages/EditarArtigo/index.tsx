import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleForm } from "../../components/ArticleForm";
import { Message } from "../../components/Message";
import { RequestResult } from "../../components/RequestResult";
import useRequest from "../../hooks/useRequest";
import { getArticle, updateArticle, createArticle } from "../../services";
import { UserContext } from "../../states/UserProvider";

export const EditarArquivoPage = () => {
  const { id } = useParams();
  const { userState } = useContext(UserContext);
  const executeRequest = useRequest();
  const [article, setArticle] = useState<Article | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (id) {
      executeRequest(() => getArticle(parseInt(id)).then((result) => setArticle(result)));
    }

    return () => setArticle(null);
  }, [id]);

  const onSubmit = (article: Article) => {
    const { titulo, conteudo, resumo, imagem } = article;

    setSuccessMessage("");
    setArticle(null);

    if (id) {
      executeRequest(() => {
        return updateArticle(
          parseInt(id),
          titulo,
          imagem,
          resumo,
          conteudo as string,
          userState.tokenData
        ).then((message) => setSuccessMessage(message));
      });
    } else {
      executeRequest(() => {
        return createArticle(titulo, imagem, resumo, conteudo as string, userState.tokenData).then(
          (message) => setSuccessMessage(message)
        );
      });
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
