import { LOGINED, LOGOUT } from "../actions/types";

export const LoginReducer = (
   state = { isLogined: false, username: "" },
   action
) => {
   switch (action.type) {
      case LOGINED:
         return (state, action) => ({
            isLogined: true,
            username: action.username,
         });
      case LOGOUT:
         return () => ({ isLogined: false });
      default:
         return state;
   }
};
