import React from "react";
import { ArticleThumbnail } from "../ArticleThumbnail";
import { Message } from "../Message";
import { ComponentProps } from "./ArticleList.model";

export const ArticleList: React.FC<ComponentProps> = ({ articles, setArticles }) => {
  return articles.length ? (
    <div className="flex flex-col items-center justify-center m-10">
      {articles.map((article) => (
        <ArticleThumbnail key={article.id} article={article} setArticles={setArticles} />
      ))}
    </div>
  ) : (
    <Message variant="info">A lista de artigos está vazia</Message>
  );
};
