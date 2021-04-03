import { LOGINED, LOGOUT } from "./types";

export const logined = (username) => ({ type: LOGINED, username });
export const logout = () => ({ type: LOGOUT });
