import { ArticlesAction, ArticlesState } from "./ArticlesProvider.model";

/**
 * @param {ArticlesState} state - Estado atual do contexto de artigos.
 * @param {ArticlesAction} action - Ação que contém um tipo e um _payload_
 * o qual deverá alterar o estado atual.
 * @returns {ArticlesState} Novo estado após as alterações.
 */
const reducer = (state: ArticlesState, action: ArticlesAction): ArticlesState => {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.payload as Article[]
      };
    case "SET_DEFAULT":
      return { articles: [] };
    default:
      return state;
  }
};

export default reducer;
