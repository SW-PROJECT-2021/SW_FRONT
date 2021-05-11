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
    default:
      return state;
  }
};
