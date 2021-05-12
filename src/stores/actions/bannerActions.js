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
} from "./types";
import * as bannerApi from "../api/bannerApi";

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
