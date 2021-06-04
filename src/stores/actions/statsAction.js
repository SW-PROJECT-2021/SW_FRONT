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
} from "./types";
import * as statisticsApi from "../api/statisticsApi";

export const SaledAll = () => async (dispatch) => {
  dispatch({ type: GET_SALED_ALL });
  try {
    const response = await statisticsApi.accumulatedSaleAll();
    console.log(response);
    dispatch({ type: GET_SALED_ALL_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: GET_SALED_ALL_ERROR, error: err });
  }
};

export const SaledByDate = (startDate, endDate) => async (dispatch) => {
  dispatch({ type: GET_SALED_DATE });
  try {
    console.log(startDate, endDate);
    const response = await statisticsApi.accumatedSaleByDate(
      startDate,
      endDate
    );
    console.log(response);
    dispatch({ type: GET_SALED_DATE_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: GET_SALED_DATE_ERROR, error: err });
  }
};

export const ProductByDate = (startDate, endDate) => async (dispatch) => {
  dispatch({ type: GET_RANK_PRODUCT });
  try {
    console.log(startDate, endDate);
    const response = await statisticsApi.accumlatedProductByCount(
      startDate,
      endDate
    );
    console.log(response);
    dispatch({ type: GET_RANK_PRODUCT_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: GET_RANK_PRODUCT_ERROR, error: err });
  }
};
export const CategoryByDate = (startDate, endDate) => async (dispatch) => {
  dispatch({ type: GET_RANK_CATEGORY });
  try {
    console.log(startDate, endDate);
    const response = await statisticsApi.accumlatedCategoryByCount(
      startDate,
      endDate
    );
    console.log(response);
    dispatch({ type: GET_RANK_CATEGORY_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: GET_RANK_CATEGORY_ERROR, error: err });
  }
};
