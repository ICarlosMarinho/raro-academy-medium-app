import { Dispatch, SetStateAction } from "react";

export interface ComponentProps {
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article[]>>;
}
