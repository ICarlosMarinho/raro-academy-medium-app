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

const RequestProvider: FC = ({ children }) => {
  const [requestState, requestDispatch] = useReducer(requestReducer, defaultState);

  return (
    <RequestContext.Provider value={{ requestState, requestDispatch }}>{children}</RequestContext.Provider>
  );
};

export default RequestProvider;
