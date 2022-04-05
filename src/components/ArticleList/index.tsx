import React, { FC, useContext } from "react";
import { ArticlesContext } from "../../states/ArticlesProvider";
import { ArticleThumbnail } from "../ArticleThumbnail";
import { Message } from "../Message";

export const ArticleList: FC = () => {
  const { articlesState } = useContext(ArticlesContext);

  return articlesState.articles.length ? (
    <div className="flex flex-col items-center justify-center m-10">
      {articlesState.articles.map((article) => (
        <ArticleThumbnail article={article} key={article.id} />
      ))}
    </div>
  ) : (
    <Message variant="info">A lista de artigos está vazia</Message>
  );
};
