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
  UPDATECART,
} from "./types";
import axios from "axios";
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
    dispatch({ type: LOGOUT_ERROR, error: error });
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

export const updateCart = () => async (dispatch) => {
  try {
    const response = await axios.get("/basket", {
      withCredentials: true,
    });
    console.log(response.data);
    dispatch({ type: UPDATECART, payload: response.data.data });
  } catch (error) {
    console.log(error);
  }
};
