import {
  GET_BANNERS,
  GET_BANNERS_SUCCESS,
  GET_BANNERS_ERROR,
  GET_BANNER,
  GET_BANNER_SUCCESS,
  GET_BANNER_ERROR,
  POST_BANNER,
  POST_BANNER_SUCCESS,
  POST_BANNER_ERROR,
  POST_BANNER_CLEAR,
  SORT_BANNER,
  SORT_BANNER_SUCCESS,
  SORT_BANNER_ERROR,
  SEARCH_BANNER,
  SEARCH_BANNER_SUCCESS,
  SEARCH_BANNER_ERROR,
  UPDATE_BANNER,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_ERROR,
  DETAIL_BANNER_CLEAR,
} from "./types";
import * as bannerApi from "../api/bannerApi";
import { Sync } from "@material-ui/icons";

export const getbanners = () => async (dispatch) => {
  dispatch({ type: GET_BANNERS });
  try {
    const response = await bannerApi.GetBanners();
    console.log(response);
    dispatch({ type: GET_BANNERS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: GET_BANNERS_ERROR });
  }
};

export const getbanner = (id) => async (dispatch) => {
  dispatch({ type: GET_BANNER });
  try {
    const response = await bannerApi.GetBannerById(id);
    console.log(response);
    dispatch({ type: GET_BANNER_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: GET_BANNER_ERROR, error: error });
  }
};

export const postbanner = (dataSubmit) => async (dispatch) => {
  dispatch({ type: POST_BANNER });
  try {
    const response = await bannerApi.PostBanner(dataSubmit);
    console.log(response);
    dispatch({ type: POST_BANNER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: POST_BANNER_ERROR, error: error });
  }
};

export const postProductClear = () => ({
  type: POST_BANNER_CLEAR,
});

export const sortbanner = (dataSubmit) => async (dispatch) => {
  dispatch({ type: SORT_BANNER });
  try {
    const response = await bannerApi.SortBanner(dataSubmit);
    console.log(response);
    dispatch({ type: SORT_BANNER_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: SORT_BANNER_ERROR, error: err });
  }
};

export const searchbanner = (dataSubmit) => async (dispatch) => {
  dispatch({ type: SEARCH_BANNER });
  try {
    const response = await bannerApi.SearchBanner(dataSubmit);
    console.log(response);
    dispatch({ type: SEARCH_BANNER_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: SEARCH_BANNER_ERROR, error: err });
  }
};

export const detailbannerClear = () => ({
  type: DETAIL_BANNER_CLEAR,
});

export const updatebanner = (dataSubmit) => async (dispatch) => {
  dispatch({ type: UPDATE_BANNER });
  try {
    const response = await bannerApi.UpdateBanner(dataSubmit);
    console.log(response);
    dispatch({ type: UPDATE_BANNER_SUCCESS, payload: response.data.data });
    return response;
  } catch (err) {
    dispatch({ type: UPDATE_BANNER_ERROR, error: err });
  }
};
