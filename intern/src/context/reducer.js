import { Actions } from "./actions";

export default (state, action) => {
  switch (action.type) {
    case Actions.SET_IS_LOGGED_IN:
      return {
        ...state,
        auth:action.payload
      }
    case Actions.SET_MESSAGE:
      return {
        ...state,
        message:action.payload
      }
    case Actions.ADD_NEW_FILE:
      return {
        ...state,
        files:state.files.concat(action.payload)
      }
    case Actions.SET_FILES:
      return {
        ...state,
        files:action.payload
      }
    case Actions.SET_ADMIN:
      return {
        ...state,
        isAdmin:action.payload
      }
    case Actions.CLEARING_DATA:
      return {
        files: [],
        message: {
          message: "",
        }
      }
    default:
      return state;
  }
};
