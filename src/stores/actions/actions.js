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
  DELETECART,
  CHANGE_COUNT_CART,
} from "./types";
import * as userApi from "../api/userApi";
import * as cartApi from "../api/cartApi";

export const logined = (dataSubmit) => async (dispatch) => {
  dispatch({ type: LOGINED });
  try {
    const response = await userApi.Userlogin(dataSubmit);
    dispatch({ type: LOGINED_SUCCESS, payload: response.data.data });
  } catch (error) {
    console.log(error);
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
    const response = await cartApi.UpdateCart();
    dispatch({ type: UPDATECART, payload: response.data.data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteCart = (id) => async (dispatch) => {
  try {
    await cartApi
      .DeleteCart(id)
      .then((res) => {
        console.log(res);
        dispatch({ type: DELETECART, payload: id });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
export const changeCountCart = (id, count) => async (dispatch) => {
  try {
    await cartApi
      .ChangeCountCart({ ProductId: id, count: count })
      .then((res) => {
        dispatch({
          type: CHANGE_COUNT_CART,
          payload: { ProductId: id, count: count },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
