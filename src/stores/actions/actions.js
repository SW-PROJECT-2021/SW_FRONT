import { LOGINED, LOGOUT, UPDATECART } from "./types";
import axios from "axios";

export const logined = (dataSubmit) => async (dispatch) => {
   try {
      const response = await axios.post(
         "http://15.164.20.183:3003/user/login",
         dataSubmit,
         { withCredentials: true }
      );
      console.log(response);
      dispatch({ type: LOGINED, payload: response.data.data });
      return response;
   } catch (error) {
      console.log(error);
   }
};

export const logout = () => async (dispatch) => {
   try {
      const response = await axios.get(
         "http://15.164.20.183:3003/user/logout",
         {
            withCredentials: true,
         }
      );
      dispatch({ type: LOGOUT });
   } catch (error) {
      console.log(error);
   }
};

export const updateCart = () => async (dispatch) => {
   try {
      const response = await axios.get("http://15.164.20.183:3003/basket");
      console.log(response.data);
      dispatch({ type: UPDATECART, payload: response.data.data });
   } catch (error) {
      console.log(error);
   }
};
