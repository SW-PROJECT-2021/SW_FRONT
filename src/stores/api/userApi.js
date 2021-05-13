import axios from "axios";

export const Userlogin = async (dataSubmit) => {
   const response = await axios({
      url: "http://15.164.20.183:3003/user/login",
      method: "post",
      data: dataSubmit,
   });
   return response;
};

export const UserLogout = async () => {
   const response = await axios({
      url: "http://15.164.20.183:3003/user/logout",
      method: "get",
   });
   return response;
};

export const IdCheck = async (id) => {
   const response = await axios({
      url: `http://15.164.20.183:3003/user/check/id/${id}`,
      method: "get",
   });
   return response;
};

export const EmailCheck = async (email) => {
   const response = await axios({
      url: `http://15.164.20.183:3003/user/check/email/${email}`,
      method: "get",
   });
   return response;
};

export const UserSignUp = async (dataSubmit) => {
   const response = await axios({
      url: "/user/signup",
      method: "post",
      data: dataSubmit,
   });
   return response;
};
