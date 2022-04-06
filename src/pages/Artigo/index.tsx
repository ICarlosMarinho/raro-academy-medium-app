import { useState, useEffect, useContext, FC } from "react";
import { useParams } from "react-router-dom";
import { ArticleView } from "../../components/ArticleView";
import { RequestResult } from "../../components/RequestResult";
import { getArticle } from "../../services";
import { RequestContext } from "../../states/RequestProvider";

export const ArtigoPage: FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const { requestDispatch } = useContext(RequestContext);
  const { id } = useParams();

  useEffect(() => {
    requestDispatch({ type: "SET_DEFAULT" });
    requestDispatch({ type: "SET_LOADING", payload: true });

    if (id) {
      getArticle(parseInt(id))
        .then((result) => setArticle(result))
        .catch((error) =>
          requestDispatch({ type: "SET_ERROR", payload: { message: error.message, hasError: true } })
        )
        .finally(() => requestDispatch({ type: "SET_LOADING", payload: false }));
    }
  }, []);

  return (
    <div className="m-10">
      <RequestResult>{!!article && <ArticleView article={article} />}</RequestResult>
    </div>
  );
};
