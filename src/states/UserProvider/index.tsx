import { FC, createContext, useReducer } from "react";
import { getTokenDataFromStorage, tokenExpired } from "../../helpers";
import { UserContextValue, UserState } from "./UserProvider.model";
import userReducer from "./UserProvider.reducer";

/**
 * @description Verifica se existe dados do _token_ armazenados
 * no _local storage_, se tiver verifica se esse _token_ ainda não
 * expirou. Se existir um _token_ e ele não estiver expirado defini
 * ele como estado inicial.
 * @returns {TokenData} Estado inicial do contexto.
 */
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

/**
 * @param {React.Node} { children } - Sub árvore de componentes a ser encapsulada pelo _UserProvider_
 * @returns {React.Context<UserContextValue>} Provider que irá fonecer o estado referente
 * ao estado _UserState_ e uma função _dispatch_ para manipular esse estado.
 */
const UserProvider: FC = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, defaultState);

  return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>;
};

export default UserProvider;
