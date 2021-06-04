import {
  GET_SALED_ALL,
  GET_SALED_ALL_SUCCESS,
  GET_SALED_ALL_ERROR,
  GET_SALED_DATE,
  GET_SALED_DATE_SUCCESS,
  GET_SALED_DATE_ERROR,
  GET_RANK_PRODUCT,
  GET_RANK_PRODUCT_SUCCESS,
  GET_RANK_PRODUCT_ERROR,
  GET_RANK_CATEGORY,
  GET_RANK_CATEGORY_SUCCESS,
  GET_RANK_CATEGORY_ERROR,
} from "../actions/types";
import { reducerUtils, handleAsyncActions } from "../../utils/asyncUtils";

const initialState = {
  saleall: reducerUtils.initial(),
  product: reducerUtils.initial(),
  category: reducerUtils.initial(),
};

export const StatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALED_ALL:
    case GET_SALED_ALL_SUCCESS:
    case GET_SALED_ALL_ERROR:
      return handleAsyncActions(GET_SALED_ALL, "saleall")(state, action);
    case GET_SALED_DATE:
    case GET_SALED_DATE_SUCCESS:
    case GET_SALED_DATE_ERROR:
      return handleAsyncActions(GET_SALED_DATE, "saleall")(state, action);
    case GET_RANK_PRODUCT:
    case GET_RANK_PRODUCT_SUCCESS:
    case GET_RANK_PRODUCT_ERROR:
      return handleAsyncActions(GET_RANK_PRODUCT, "product")(state, action);
    case GET_RANK_CATEGORY:
    case GET_RANK_CATEGORY_SUCCESS:
    case GET_RANK_CATEGORY_ERROR:
      return handleAsyncActions(GET_RANK_CATEGORY, "category")(state, action);
    default:
      return state;
  }
};
