import React, { createContext, FC, useReducer } from "react";
import { ArticlesContextValue, ArticlesState } from "./ArticlesProvider.model";
import reducer from "./ArticlesProvider.reducer";

const defaultState: ArticlesState = {
  articles: []
};

export const ArticlesContext = createContext<ArticlesContextValue>({
  articlesState: defaultState,
  articlesDispatch: () => {}
});

/**
 * @param {React.Node} { children } - Sub árvore de componentes a ser encapsulada pelo _ArticlesProvider_
 * @returns {React.Context<ArticlesContextValue>} Provider que irá fonecer o estado referente
 * aos artigos e uma função _dispatch_ para manipular esse estado.
 */
const ArticlesProvider: FC = ({ children }) => {
  const [articlesState, articlesDispatch] = useReducer(reducer, defaultState);

  return (
    <ArticlesContext.Provider value={{ articlesState, articlesDispatch }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesProvider;
