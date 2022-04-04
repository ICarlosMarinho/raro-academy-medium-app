import { Dispatch, SetStateAction } from "react";

export interface ComponentProps {
  article: Article;
  setArticles: Dispatch<SetStateAction<Article[]>>;
}
