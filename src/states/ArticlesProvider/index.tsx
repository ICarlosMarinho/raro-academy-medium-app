import { createContext, FC, useReducer } from "react";
import { ContextValue, State } from "./ArticlesProvider.model";
import reducer from "./ArticlesProvider.reducer";

const defaultState: State = {
  articles: []
};

export const ArticlesContext = createContext<ContextValue>({
  state: defaultState,
  dispatch: () => {}
});

const ArticlesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return <ArticlesContext.Provider value={{ state, dispatch }}>{children}</ArticlesContext.Provider>;
};

export default ArticlesProvider;
