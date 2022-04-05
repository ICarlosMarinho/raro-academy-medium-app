import { Action, State } from "./ArticlesProvider.model";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.payload.articles
      };
    default:
      return state;
  }
};

export default reducer;
