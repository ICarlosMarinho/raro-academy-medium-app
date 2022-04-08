import { RequestAction, RequestState } from "./RequestProvider.model";

/**
 * @param {RequestState} state - Estado atual do contexto de _requests_.
 * @param {RequestAction} action - Ação que contém um tipo e um _payload_
 * o qual deverá alterar o estado atual.
 * @returns {RequestState} Novo estado após as alterações.
 */
const requestReducer = (state: RequestState, action: RequestAction): RequestState => {
  switch (action?.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload as boolean };
    case "SET_ERROR":
      return { ...state, error: action.payload as RequestError };
    case "SET_DEFAULT":
      return { loading: false, error: { hasError: false, message: "" } };
    default:
      return state;
  }
};

export default requestReducer;
