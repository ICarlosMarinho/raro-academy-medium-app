import { createContext, FC, useReducer } from "react";
import { ArticlesContextValue, ArticlesState } from "./ArticlesProvider.model";
import reducer from "./ArticlesProvider.reducer";

const defaultState: ArticlesState = {
  articles: []
};

export const ArticlesContext = createContext<ArticlesContextValue>({
  articlesState: defaultState,
  articlesDispatch: () => {}
});

const ArticlesProvider: FC = ({ children }) => {
  const [articlesState, articlesDispatch] = useReducer(reducer, defaultState);

  return (
    <ArticlesContext.Provider value={{ articlesState, articlesDispatch }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesProvider;
