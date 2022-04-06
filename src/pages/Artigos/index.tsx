import { FC, useContext, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { ArticleList } from "../../components/ArticleList";
import { RequestResult } from "../../components/RequestResult";
import { getArticles } from "../../services";
import { ArticlesContext } from "../../states/ArticlesProvider";
import { RequestContext } from "../../states/RequestProvider";
import { UserContext } from "../../states/UserProvider";

export const ArtigosPage: FC = () => {
  const { articlesDispatch } = useContext(ArticlesContext);
  const { requestState, requestDispatch } = useContext(RequestContext);
  const { userState } = useContext(UserContext);
  const match = useMatch("/artigos");

  useEffect(() => {
    requestDispatch({ type: "SET_DEFAULT" });
    requestDispatch({ type: "SET_LOADING", payload: true });

    getArticles(match ? userState.tokenData : null)
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
