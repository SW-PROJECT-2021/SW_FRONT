import axios from "axios";

export const Userlogin = async (dataSubmit) => {
   const response = await axios(
      {
         url: "http://15.164.20.183:3003/api/user/login",
         method: "post",
         data: dataSubmit,
      },
      { withCredentials: true }
   );
   return response;
};

export const UserLogout = async () => {
   const response = await axios(
      {
         url: "http://15.164.20.183:3003/api/user/logout",
         method: "get",
      },
      { withCredentials: true }
   );
   return response;
};

export const IdCheck = async (id) => {
   const response = await axios(
      {
         url: `http://15.164.20.183:3003/api/user/check/id/${id}`,
         method: "get",
      },
      { withCredentials: true }
   );
   return response;
};

export const EmailCheck = async (email) => {
   const response = await axios(
      {
         url: `http://15.164.20.183:3003/api/user/check/email/${email}`,
         method: "get",
      },
      { withCredentials: true }
   );
   return response;
};

export const UserSignUp = async (dataSubmit) => {
   const response = await axios({
      url: "/api/user/signup",
      method: "post",
      data: dataSubmit,
   });
   return response;
};
