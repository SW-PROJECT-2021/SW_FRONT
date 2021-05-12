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
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  POST_PRODUCT,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_ERROR,
  POST_PRODUCT_CLEAR,
  UPDATECART,
  DELETECART,
  CHANGE_COUNT_CART,
} from "./types";
import axios from "axios";
import * as userApi from "../api/userApi";
import * as productApi from "../api/productApi";
import * as cartApi from "../api/cartApi";

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

export const getProduct = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS });
  try {
    const response = await productApi.GetProductList();
    console.log(response);
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR, error: error });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT });
  try {
    const response = await productApi.GetProductById(id);
    console.log(response);
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_ERROR, error: error });
  }
};

export const postProduct = (dataSubmit) => async (dispatch) => {
  dispatch({ type: POST_PRODUCT });
  try {
    const response = await productApi.PostProduct(dataSubmit);
    console.log(response);
    dispatch({ type: POST_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: POST_PRODUCT_ERROR, error: error });
  }
};
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
export const postProductClear = () => ({
  type: POST_PRODUCT_CLEAR,
});
