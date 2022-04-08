import React, { FC, useContext } from "react";
import { ArticlesContext } from "../../states/ArticlesProvider";
import { ArticleThumbnail } from "../ArticleThumbnail";
import { Message } from "../Message";

export const ArticleList: FC = () => {
  const { articlesState } = useContext(ArticlesContext);

  const renderArticles = () => {
    return articlesState.articles.map((article) => <ArticleThumbnail article={article} key={article.id} />);
  };

  return articlesState.articles.length ? (
    <div className="flex flex-col items-center justify-center m-10">{renderArticles()}</div>
  ) : (
    <Message variant="info">A lista de artigos está vazia</Message>
  );
};
