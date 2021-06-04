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
import { reducerUtils, handleAsyncActions } from "../../utils/asyncUtils";

const initialState = {
  couponlist: reducerUtils.initial(),
  coupondetail: reducerUtils.initial(),
  postcoupon: reducerUtils.initial(),
  registecoupon: reducerUtils.initial(),
};
export const CouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUPON_ALL:
    case GET_COUPON_ALL_SUCCESS:
    case GET_COUPON_ALL_ERROR:
      return handleAsyncActions(GET_COUPON_ALL, "couponlist")(state, action);
    case GET_COUPON_USER:
    case GET_COUPON_USER_SUCCESS:
    case GET_COUPON_USER_ERROR:
      return handleAsyncActions(GET_COUPON_USER, "coupondetail")(state, action);
    case POST_COUPON:
    case POST_COUPON_SUCCESS:
    case POST_COUPON_ERROR:
      return handleAsyncActions(POST_COUPON, "postcoupon")(state, action);
    case POST_COUPONREGISTE_ALL:
    case POST_COUPONREGISTE_ALL_SUCCESS:
    case POST_COUPONREGISTE_ALL_ERROR:
      return handleAsyncActions(POST_COUPONREGISTE_ALL, "registecoupon")(
        state,
        action
      );
    case POST_COUPONREGISTE_USER:
    case POST_COUPONREGISTE_USER_SUCCESS:
    case POST_COUPONREGISTE_USER_ERROR:
      return handleAsyncActions(POST_COUPONREGISTE_USER, "registecoupon")(
        state,
        action
      );
    case CLEAR_COUPONDATA:
      return { ...state, postcoupon: reducerUtils.initial() };
    case CLEAR_COUPON_REGISTE:
      return { ...state, registecoupon: reducerUtils.initial() };
    default:
      return state;
  }
};
