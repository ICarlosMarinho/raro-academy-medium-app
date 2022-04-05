import { FC, useContext, useEffect, useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import { Message } from "../../components/Message";
import { ArticlesContext } from "../../states/ArticlesProvider";
import { ComponentProps } from "./Artigos.model";

export const ArtigosPage: FC<ComponentProps> = ({ request }) => {
  const { articlesDispatch } = useContext(ArticlesContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<RequestError>({ message: "", hasError: false });

  useEffect(() => {
    request()
      .then((result) => articlesDispatch({ type: "SET_ARTICLES", payload: result }))
      .catch((error) => setError({ message: error.message, hasError: true }))
      .finally(() => setLoading(false));
  }, []);

  const renderAticles = () => {
    return loading ? <Message variant="info">Carregando...</Message> : !error.hasError && <ArticleList />;
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
