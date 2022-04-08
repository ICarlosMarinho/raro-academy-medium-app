import { Dispatch } from "react";

export interface RequestState {
  loading: boolean;
  error: RequestError;
}

export interface RequestAction {
  type: "SET_LOADING" | "SET_ERROR" | "SET_DEFAULT";
  payload?: boolean | RequestError;
}

export interface RequestContextValue {
  requestState: RequestState;
  requestDispatch: Dispatch<RequestAction>;
}
