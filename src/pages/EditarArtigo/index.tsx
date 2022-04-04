import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleForm } from "../../components/ArticleForm";
import { Message } from "../../components/Message";
import { getArticle, updateArticle, createArticle } from "../../services";

export const EditarArquivoPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState<RequestError>({ message: "", hasError: false });

  useEffect(() => {
    if (id) {
      setLoading(true);

      getArticle(parseInt(id))
        .then((result) => setArticle(result))
        .catch((error) => setError({ message: error.message, hasError: true }))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const onSubmit = (article: Article) => {
    setLoading(true);
    setError({ message: "", hasError: false });
    setSuccessMessage("");

    if (id) {
      const { id, titulo, conteudo, resumo, imagem } = article;

      updateArticle(id, titulo, imagem, resumo, conteudo as string)
        .then((message) => setSuccessMessage(message))
        .catch((error) => setError({ message: error.message, hasError: true }))
        .finally(() => setLoading(false));
    } else {
      const { titulo, conteudo, resumo, imagem } = article;

      createArticle(titulo, imagem, resumo, conteudo as string)
        .then((message) => setSuccessMessage(message))
        .catch((error) => setError({ message: error.message, hasError: true }))
        .finally(() => setLoading(false));
    }
  };

  const renderArticleForm = () => {
    return !article && loading ? (
      <Message variant="info">Carregando...</Message>
    ) : (
      <ArticleForm article={article} onSubmit={onSubmit} loading={loading} />
    );
  };

  const renderSuccessMessage = () => {
    return successMessage ? <Message variant="info">{successMessage}</Message> : null;
  };

  const renderError = () => {
    return error.hasError ? <Message variant="error">{error.message}</Message> : null;
  };

  return (
    <div className="items-center justify-center m-10">
      {renderArticleForm()}
      {renderError()}
      {renderSuccessMessage()}
    </div>
  );
};
