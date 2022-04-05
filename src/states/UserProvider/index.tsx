import { FC, createContext, useReducer } from "react";
import { getTokenDataFromStorage, tokenExpired } from "../../helpers";
import { UserContextValue, UserState } from "./UserProvider.model";
import userReducer from "./UserProvider.reducer";

const initState = () => {
  const tokenData = getTokenDataFromStorage();

  if (tokenData) {
    return tokenExpired(tokenData.token) ? null : tokenData;
  }

  return tokenData;
};

const defaultState: UserState = {
  tokenData: initState()
};

export const UserContext = createContext<UserContextValue>({
  userState: defaultState,
  userDispatch: () => {}
});

const UserProvider: FC = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, defaultState);

  return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>;
};

export default UserProvider;
