import { FC, useContext, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { ArticleList } from "../../components/ArticleList";
import { RequestResult } from "../../components/RequestResult";
import useRequest from "../../hooks/useRequest";
import { getArticles } from "../../services";
import { ArticlesContext } from "../../states/ArticlesProvider";
import { RequestContext } from "../../states/RequestProvider";
import { UserContext } from "../../states/UserProvider";

export const ArtigosPage: FC = () => {
  const { articlesDispatch } = useContext(ArticlesContext);
  const { requestState } = useContext(RequestContext);
  const executeRequest = useRequest();
  const { userState } = useContext(UserContext);
  const match = useMatch("/artigos");

  const request = () => {
    return getArticles(match ? userState.tokenData : null).then((result) =>
      articlesDispatch({ type: "SET_ARTICLES", payload: result })
    );
  };

  useEffect(() => {
    executeRequest(request);

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
