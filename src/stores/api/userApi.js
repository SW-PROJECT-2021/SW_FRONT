import axios from "axios";

export const Userlogin = async (dataSubmit) => {
   const response = await axios({
      url: `${process.env.REACT_APP_API_BASEURL}/api/user/login`,
      method: "post",
      data: dataSubmit,
   });
   return response;
};

export const UserLogout = async () => {
   const response = await axios({
      url: `${process.env.REACT_APP_API_BASEURL}/api/user/logout`,
      method: "get",
   });
   return response;
};

export const IdCheck = async (id) => {
   const response = await axios({
      url: `${process.env.REACT_APP_API_BASEURL}/api/user/check/id/${id}`,
      method: "get",
   });
   return response;
};

export const EmailCheck = async (email) => {
   const response = await axios({
      url: `${process.env.REACT_APP_API_BASEURL}/api/user/check/email/${email}`,
      method: "get",
   });
   return response;
};

export const UserSignUp = async (dataSubmit) => {
   const response = await axios({
      url: `${process.env.REACT_APP_API_BASEURL}/api/user/signup`,
      method: "post",
      data: dataSubmit,
   });
   return response;
};
