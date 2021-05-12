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
} from "../actions/types";
import { reducerUtils, handleAsyncActions } from "../../utils/asyncUtils";

const initialState = {
  bannerlist: reducerUtils.initial(),
  bannerdetail: reducerUtils.initial(),
  bannerpost: reducerUtils.initial(),
};

export const BannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BANNERS:
    case GET_BANNERS_SUCCESS:
    case GET_BANNERS_ERROR:
      return handleAsyncActions(GET_BANNERS, "bannerlist")(state, action);
    case GET_BANNER:
    case GET_BANNER_SUCCESS:
    case GET_BANNER_ERROR:
      return handleAsyncActions(GET_BANNER, "bannerdetail")(state, action);
    case POST_BANNER:
    case POST_BANNER_SUCCESS:
    case POST_BANNER_ERROR:
      return handleAsyncActions(POST_BANNER, "bannerpost")(state, action);
    case POST_BANNER_CLEAR:
      return { ...state, bannerpost: reducerUtils.initial() };
    default:
      return state;
  }
};
