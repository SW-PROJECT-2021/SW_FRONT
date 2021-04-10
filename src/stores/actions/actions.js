import { LOGINED, LOGOUT } from "./types";
import axios from "axios";

export const logined = (dataSubmit) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://15.164.20.183:3003/user/login",
      dataSubmit
    );
    console.log(response);
    dispatch({ type: LOGINED, payload: response.data.data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get("http://15.164.20.183:3003/user/logout");
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
