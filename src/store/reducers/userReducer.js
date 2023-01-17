import actionTypes from "../actions/actionTypes";
import { socketDisconnect, createNameSpace } from "../actions";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      createNameSpace(action.userInfo.id);
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.USER_REGISTER_SUCCESS:
      createNameSpace(action.userInfo.id);
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      socketDisconnect();
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    default:
      return state;
  }
};

export default appReducer;
