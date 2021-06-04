import {
  GET_COUPON_ALL,
  GET_COUPON_ALL_SUCCESS,
  GET_COUPON_ALL_ERROR,
  GET_COUPON_USER,
  GET_COUPON_USER_SUCCESS,
  GET_COUPON_USER_ERROR,
  POST_COUPON,
  POST_COUPON_SUCCESS,
  POST_COUPON_ERROR,
  POST_COUPONREGISTE_ALL,
  POST_COUPONREGISTE_ALL_SUCCESS,
  POST_COUPONREGISTE_ALL_ERROR,
  POST_COUPONREGISTE_USER,
  POST_COUPONREGISTE_USER_SUCCESS,
  POST_COUPONREGISTE_USER_ERROR,
  CLEAR_COUPONDATA,
  CLEAR_COUPON_REGISTE,
} from "../actions/types";
import * as couponApi from "../api/couponApi";

export const getCouponAllAction = () => async (dispatch) => {
  dispatch({ type: GET_COUPON_ALL });
  try {
    const response = await couponApi.getCouponAll();
    console.log(response);
    dispatch({ type: GET_COUPON_ALL_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: GET_COUPON_ALL_ERROR, payload: err, error: true });
  }
};

export const getUserByCouponAction = (data) => async (dispatch) => {
  dispatch({ type: GET_COUPON_USER });
  try {
    const response = await couponApi.getUserByCoupon(data);
    console.log(response);
    dispatch({ type: GET_COUPON_USER_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: GET_COUPON_USER_ERROR, payload: err, error: true });
  }
};

export const postCouponAction = (data) => async (dispatch) => {
  dispatch({ type: POST_COUPON });
  try {
    const response = await couponApi.postCoupon(data);
    console.log(response);
    dispatch({ type: POST_COUPON_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: POST_COUPON_ERROR, payload: err, error: true });
  }
};
export const registeCouponByAllAction = (data) => async (dispatch) => {
  dispatch({ type: POST_COUPONREGISTE_ALL });
  try {
    const response = await couponApi.registeCouponByAll(data);
    console.log(response);
    dispatch({
      type: POST_COUPONREGISTE_ALL_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({ type: POST_COUPONREGISTE_ALL_ERROR, payload: err, error: true });
  }
};

export const registeCouponByUserAction = (data) => async (dispatch) => {
  dispatch({ type: POST_COUPONREGISTE_USER });
  try {
    const response = await couponApi.registeCouponByUser(data);
    console.log(response);
    dispatch({
      type: POST_COUPONREGISTE_USER_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: POST_COUPONREGISTE_USER_ERROR,
      payload: err,
      error: true,
    });
  }
};

export const postCouponClear = () => ({
  type: CLEAR_COUPONDATA,
});
export const registeCouponClear = () => ({
  type: CLEAR_COUPON_REGISTE,
});
