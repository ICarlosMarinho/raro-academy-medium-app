import { useState, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import { ArticleView } from "../../components/ArticleView";
import { RequestResult } from "../../components/RequestResult";
import useRequest from "../../hooks/useRequest";
import { getArticle } from "../../services";

export const ArtigoPage: FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const executeRequests = useRequest();
  const { id } = useParams();

  const request = () => {
    return getArticle(parseInt(id as string)).then((article) => setArticle(article));
  };

  useEffect(() => {
    if (id) {
      executeRequests(request);
    }
  }, []);

  return (
    <div className="m-10">
      <RequestResult>{!!article && <ArticleView article={article} />}</RequestResult>
    </div>
  );
};
