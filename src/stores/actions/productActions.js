import {
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
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  ORDER_PRODUCT,
  SEARCH_PRODUCT,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_ERROR,
} from "./types";
import * as productApi from "../api/productApi";

export const getProductAction = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS });
  try {
    console.log("테스트입니다");
    const response = await productApi.GetProductList();
    console.log(response);
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data.data });
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

export const postProductClear = () => ({
  type: POST_PRODUCT_CLEAR,
});

export const UpdateProductId = (dataSubmit) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT });
  try {
    const resposne = await productApi.UpdateProduct(dataSubmit);
    console.log(resposne);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: resposne.data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_ERROR, error: error });
  }
};

export const OrderProductAction = (Orderdata) => ({
  type: ORDER_PRODUCT,
  payload: Orderdata,
});

export const SearchProductAction = (dataSubmit) => async (dispatch) => {
  dispatch({ type: SEARCH_PRODUCT });
  try {
    const resposne = await productApi.SearchProduct(dataSubmit);
    console.log(resposne);
    dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: resposne.data.data });
  } catch (error) {
    dispatch({ type: SEARCH_PRODUCT_ERROR, error: error });
  }
};
