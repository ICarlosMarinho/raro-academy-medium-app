import { createContext, FC, useReducer } from "react";
import { RequestContextValue, RequestState } from "./RequestProvider.model";
import requestReducer from "./RequestProvider.reducer";

const defaultState: RequestState = {
  loading: false,
  error: { hasError: false, message: "" }
};

export const RequestContext = createContext<RequestContextValue>({
  requestState: defaultState,
  requestDispatch: () => {}
});

/**
 * @param {React.Node} { children } - Sub árvore de componentes a ser encapsulada pelo _RequestProvider_
 * @returns {React.Context<RequestContextValue>} Provider que irá fonecer o estado referente
 * ao estado _requisições_ e uma função _dispatch_ para manipular esse estado.
 */
const RequestProvider: FC = ({ children }) => {
  const [requestState, requestDispatch] = useReducer(requestReducer, defaultState);

  return (
    <RequestContext.Provider value={{ requestState, requestDispatch }}>{children}</RequestContext.Provider>
  );
};

export default RequestProvider;
