import { useEffect, useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import { Message } from "../../components/Message";
import { getArticles } from "../../services";

export const ArtigosPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<RequestError>({ message: "", hasError: false });

  useEffect(() => {
    getArticles()
      .then((result) => setArticles(result))
      .catch((error) => setError({ message: error.message, hasError: true }))
      .finally(() => setLoading(false));
  }, []);

  const renderAticles = () => {
    return loading ? (
      <Message variant="info">Carregando...</Message>
    ) : (
      !error.hasError && <ArticleList articles={articles} />
    );
  };

  const renderError = () => {
    return error.hasError ? <Message variant="error">{error.message}</Message> : null;
  };

  return (
    <div className="my-30">
      {renderAticles()}
      {renderError()}
    </div>
  );
};
