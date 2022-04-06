import { FC, useContext, useEffect } from "react";
import { ArticleList } from "../../components/ArticleList";
import { RequestResult } from "../../components/RequestResult";
import { ArticlesContext } from "../../states/ArticlesProvider";
import { RequestContext } from "../../states/RequestProvider";
import { ComponentProps } from "./Artigos.model";

export const ArtigosPage: FC<ComponentProps> = ({ request }) => {
  const { articlesDispatch } = useContext(ArticlesContext);
  const { requestState, requestDispatch } = useContext(RequestContext);

  useEffect(() => {
    requestDispatch({ type: "SET_DEFAULT" });
    requestDispatch({ type: "SET_LOADING", payload: true });

    request()
      .then((result) => articlesDispatch({ type: "SET_ARTICLES", payload: result }))
      .catch((error) =>
        requestDispatch({ type: "SET_ERROR", payload: { message: error.message, hasError: true } })
      )
      .finally(() => requestDispatch({ type: "SET_LOADING", payload: false }));

    return resetArticles;
  }, []);

  const resetArticles = () => {
    articlesDispatch({ type: "SET_DEFAULT" });
  };

  return (
    <div className="my-30">
      <RequestResult>{!requestState.loading && <ArticleList />}</RequestResult>
    </div>
  );
};
