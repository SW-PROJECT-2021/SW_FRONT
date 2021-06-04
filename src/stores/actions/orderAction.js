import {
  GET_ORDER_ALL,
  GET_ORDER_ALL_SUCCESS,
  GET_ORDER_ALL_ERROR,
  FILTER_ORDER_ALL,
  FILTER_ORDER_ALL_SUCCESS,
  FILTER_ORDER_ALL_ERROR,
  PUT_ORDER_STATE,
  PUT_ORDER_STATE_SUCCESS,
  PUT_ORDER_STATE_ERROR,
  GET_ORDER_REVIEWS,
  GET_ORDER_REVIEWS_SUCCESS,
  GET_ORDER_REVIEWS_ERROR,
} from "./types";
import * as orderApi from "../api/orderApi";

export const getOrderListAllAction = () => async (dispatch) => {
  dispatch({ type: GET_ORDER_ALL });
  try {
    const response = await orderApi.GetOrderList();
    console.log(response);
    dispatch({ type: GET_ORDER_ALL_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: GET_ORDER_ALL_ERROR, payload: err, error: true });
  }
};

export const filterOrderListAllAction = (startDate, endDate) => async (
  dispatch
) => {
  dispatch({ type: FILTER_ORDER_ALL });
  try {
    const response = await orderApi.FilterOrderList(startDate, endDate);
    console.log(response);
    dispatch({ type: FILTER_ORDER_ALL_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: FILTER_ORDER_ALL_ERROR, payload: err, error: true });
  }
};

export const updateOrderStateAction = (id) => async (dispatch) => {
  dispatch({ type: PUT_ORDER_STATE });
  try {
    const response = await orderApi.UpdateOrderState(id);
    console.log(response);
    dispatch({ type: PUT_ORDER_STATE_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: PUT_ORDER_STATE_ERROR, payload: err, error: true });
  }
};

export const getOrderReivewsAction = (id) => async (dispatch) => {
  dispatch({ type: GET_ORDER_REVIEWS });
  try {
    const response = await orderApi.OrderReview(id);
    console.log(response);
    dispatch({ type: GET_ORDER_REVIEWS_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: GET_ORDER_REVIEWS_ERROR, payload: err, error: true });
  }
};
