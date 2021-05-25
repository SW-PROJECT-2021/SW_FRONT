import {
  LOGINED,
  LOGINED_SUCCESS,
  LOGINED_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_CLEAR,
  ADMIN_CHECK,
  ADMIN_CHECK_SUCCESS,
  ADMIN_CHECK_ERROR,
  ADMIN_CHECK_CLEAR,
} from "../actions/types";
import { reducerUtils, handleAsyncActions } from "../../utils/asyncUtils";
//login-> Logined와 admin을 받는다

const initialState = {
  users: reducerUtils.initial(),
  sign: reducerUtils.initial(),
  admincheck: reducerUtils.initial(),
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINED:
    case LOGINED_SUCCESS:
    case LOGINED_ERROR:
      return handleAsyncActions(LOGINED, "users")(state, action);
    case LOGOUT:
    case LOGOUT_ERROR:
      return handleAsyncActions(LOGOUT, "users")(state, action);
    case LOGOUT_SUCCESS:
      return { ...state, users: reducerUtils.initial() };
    case SIGNUP:
    case SIGNUP_SUCCESS:
    case SIGNUP_ERROR:
      return handleAsyncActions(SIGNUP, "sign")(state, action);
    case SIGNUP_CLEAR:
      return { ...state, sign: reducerUtils.initial() };
    case ADMIN_CHECK:
    case ADMIN_CHECK_SUCCESS:
    case ADMIN_CHECK_ERROR:
      return handleAsyncActions(ADMIN_CHECK, "admincheck")(state, action);
    case ADMIN_CHECK_CLEAR:
      return { ...state, admincheck: reducerUtils.initial() };
    default:
      return state;
  }
};
