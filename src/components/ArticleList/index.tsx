import React from "react";
import { ArticleThumbnail } from "../ArticleThumbnail";
import { Message } from "../Message";

export const ArticleList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return articles.length ? (
    <div className="flex flex-col items-center justify-center m-10">
      {articles.map((article) => (
        <ArticleThumbnail key={article.id} {...article} />
      ))}
    </div>
  ) : (
    <Message variant="info">A lista de artigos está vazia</Message>
  );
};
