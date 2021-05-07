import axios from "axios";

export const Userlogin = async (dataSubmit) => {
  const response = await axios({
    url: "/user/login",
    method: "post",
    data: dataSubmit,
  });
  return response;
};

export const UserLogout = async () => {
  const response = await axios({
    url: "/user/logout",
    method: "get",
  });
  return response;
};

export const IdCheck = async (id) => {
  const response = await axios({
    url: `/user/check/id/${id}`,
    method: "get",
  });
  return response;
};

export const EmailCheck = async (email) => {
  const response = await axios({
    url: `/user/check/email/${email}`,
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
