import { UserAction, UserState } from "./UserProvider.model";

/**
 * @param {UserState} state - Estado atual do contexto de usuários.
 * @param {UserAction} action - Ação que contém um tipo e um _payload_
 * o qual deverá alterar o estado atual.
 * @returns {UserState} Novo estado após as alterações.
 */
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_TOKEN_DATA":
      return {
        ...state,
        tokenData: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
