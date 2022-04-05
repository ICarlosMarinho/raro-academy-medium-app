import { UserAction, UserState } from "./UserProvider.model";

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
