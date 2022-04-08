import { Dispatch } from "react";

export interface UserState {
  tokenData: TokenData | null;
}

export interface UserAction {
  type: "SET_TOKEN_DATA";
  payload: TokenData | null;
}

export interface UserContextValue {
  userState: UserState;
  userDispatch: Dispatch<UserAction>;
}
