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
} from "../actions/types";
import { reducerUtils, handleAsyncActions } from "../../utils/asyncUtils";

const initialState = {
  orderlist: reducerUtils.initial(),
  orderstate: reducerUtils.initial(),
  orderreview: reducerUtils.initial(),
};

export const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_ALL:
    case GET_ORDER_ALL_SUCCESS:
    case GET_ORDER_ALL_ERROR:
      return handleAsyncActions(GET_ORDER_ALL, "orderlist")(state, action);
    case PUT_ORDER_STATE:
    case PUT_ORDER_STATE_SUCCESS:
    case PUT_ORDER_STATE_ERROR:
      return handleAsyncActions(PUT_ORDER_STATE, "orderstate")(state, action);
    case FILTER_ORDER_ALL:
    case FILTER_ORDER_ALL_SUCCESS:
    case FILTER_ORDER_ALL_ERROR:
      return handleAsyncActions(FILTER_ORDER_ALL, "orderlist")(state, action);
    case GET_ORDER_REVIEWS:
    case GET_ORDER_REVIEWS_SUCCESS:
    case GET_ORDER_REVIEWS_ERROR:
      return handleAsyncActions(GET_ORDER_REVIEWS, "orderreview")(
        state,
        action
      );
    default:
      return state;
  }
};
