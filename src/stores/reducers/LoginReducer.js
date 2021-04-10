import { LOGINED, LOGOUT } from "../actions/types";

//login-> Logined와 admin을 받는다

const initialState = {
  users: {
    isLogined: null,
    userName: null,
    isAdmin: null,
  },
};
export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINED:
      return {
        ...state,
        users: {
          isLogined: true,
          userName: action.payload.userName,
          isAdmin: action.payload.isAdmin,
        },
      };
    case LOGOUT:
      return {
        ...state,
        users: {
          isLogined: null,
          userName: null,
          isAdmin: null,
        },
      };
    default:
      return state;
  }
};
