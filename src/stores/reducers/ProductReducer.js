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
  FILTER_PRODUCT,
  FILTER_PRODUCT_SUCCESS,
  FILTER_PRODUCT_ERROR,
} from "../actions/types";
import { reducerUtils, handleAsyncActions } from "../../utils/asyncUtils";

const initialState = {
  productlist: reducerUtils.initial(),
  productDetail: reducerUtils.initial(),
  postproduct: reducerUtils.initial(),
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
    case GET_PRODUCTS_SUCCESS:
    case GET_PRODUCTS_ERROR:
      return handleAsyncActions(GET_PRODUCTS, "productlist")(state, action);
    case GET_PRODUCT:
    case GET_PRODUCT_SUCCESS:
    case GET_PRODUCT_ERROR:
      return handleAsyncActions(GET_PRODUCT, "productDetail")(state, action);
    case POST_PRODUCT:
    case POST_PRODUCT_SUCCESS:
    case POST_PRODUCT_ERROR:
      return handleAsyncActions(POST_PRODUCT, "postproduct")(state, action);
    case POST_PRODUCT_CLEAR:
      return { ...state, postproduct: reducerUtils.initial() };
    case UPDATE_PRODUCT:
    case UPDATE_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_ERROR:
      return handleAsyncActions(UPDATE_PRODUCT, "productDetail")(state, action);
    case ORDER_PRODUCT:
      return { ...state, productlist: reducerUtils.success(action.payload) };
    case SEARCH_PRODUCT:
    case SEARCH_PRODUCT_SUCCESS:
    case SEARCH_PRODUCT_ERROR:
      return handleAsyncActions(SEARCH_PRODUCT, "productlist")(state, action);
    case FILTER_PRODUCT:
    case FILTER_PRODUCT_SUCCESS:
    case FILTER_PRODUCT_ERROR:
      return handleAsyncActions(FILTER_PRODUCT, "productlist")(state, action);
    default:
      return state;
  }
};
