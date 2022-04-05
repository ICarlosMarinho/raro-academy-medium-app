import { ArticlesAction, ArticlesState } from "./ArticlesProvider.model";

const reducer = (state: ArticlesState, action: ArticlesAction): ArticlesState => {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
