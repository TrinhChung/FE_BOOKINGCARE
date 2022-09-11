import actionTypes from "./actionTypes";
import { handleLoginApi, loginByToken } from "../../services/userService";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userStartLogin = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleLoginApi(data.username, data.password);
      if (res && res.errCode === 0) {
        dispatch(userLoginSuccess(res.data));
      } else {
        dispatch(userLoginFail());
      }
    } catch (err) {
      console.log("LOGIN ERR ", err);
      dispatch(userLoginFail());
    }
  };
};

export const loginToken = () => {
  return async (dispatch, getState) => {
    try {
      let res = await loginByToken();
      if (res && res.errCode === 0) {
        dispatch(userLoginSuccess(res.user));
      } else {
        dispatch(userLoginFail());
      }
    } catch (err) {
      console.log("LOGIN ERR ", err);
      dispatch(userLoginFail());
    }
  };
};

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const userRegisterSuccess = (userInfo) => ({
  type: actionTypes.USER_REGISTER_SUCCESS,
  userInfo: userInfo,
});

export const userRegisterFail = () => ({
  type: actionTypes.USER_REGISTER_FAIL,
});
