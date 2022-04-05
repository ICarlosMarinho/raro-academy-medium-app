import { Dispatch } from "react";

export interface State {
  articles: Article[];
}

export interface Payload extends State {}

export interface Action {
  type: "SET_ARTICLES";
  payload: Payload;
}

export interface ContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}
