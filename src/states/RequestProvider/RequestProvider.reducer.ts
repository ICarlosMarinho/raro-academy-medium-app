import { RequestAction, RequestState } from "./RequestProvider.model";

const requestReducer = (state: RequestState, action: RequestAction): RequestState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload as boolean };
    case "SET_ERROR":
      return { ...state, error: action.payload as RequestError };
    default:
      return state;
  }
};

export default requestReducer;
