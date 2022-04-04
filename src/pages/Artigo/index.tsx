import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleView } from "../../components/ArticleView";
import { Message } from "../../components/Message";
import { getArticle } from "../../services";

export const ArtigoPage = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<RequestError>({ message: "", hasError: false });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getArticle(parseInt(id))
        .then((result) => setArticle(result))
        .catch((error) => setError({ message: error.message, hasError: true }))
        .finally(() => setLoading(false));
    }
  }, []);

  const renderArticleView = () => {
    return !article && loading ? (
      <Message variant="info">Carregando...</Message>
    ) : (
      article && <ArticleView article={article} />
    );
  };

  const renderError = () => {
    return error.hasError ? <Message variant="error">{error.message}</Message> : null;
  };

  return (
    <div className="m-10">
      {renderArticleView()}
      {renderError()}
    </div>
  );
};
