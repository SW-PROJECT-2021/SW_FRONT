import {
  LOGINED,
  LOGINED_SUCCESS,
  LOGINED_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_CLEAR,
} from "./types";
import * as userApi from "../api/userApi";

export const logined = (dataSubmit) => async (dispatch) => {
  dispatch({ type: LOGINED });
  try {
    const response = await userApi.Userlogin(dataSubmit);
    dispatch({ type: LOGINED_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: LOGINED_ERROR, error: error });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  try {
    const response = await userApi.UserLogout();
    console.log(response);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_ERROR });
  }
};

export const signup = (dataSubmit) => async (dispatch) => {
  dispatch({ type: SIGNUP });
  try {
    const response = await userApi.UserSignUp(dataSubmit);
    console.log(response);
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SIGNUP_ERROR, error: error });
  }
};

export const signupClear = () => ({
  type: SIGNUP_CLEAR,
});
