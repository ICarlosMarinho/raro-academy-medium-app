import { Dispatch } from "react";

export interface ArticlesState {
  articles: Article[];
}

export interface ArticlesAction {
  type: "SET_ARTICLES";
  payload: Article[];
}

export interface ArticlesContextValue {
  articlesState: ArticlesState;
  articlesDispatch: Dispatch<ArticlesAction>;
}
