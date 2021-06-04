import axios from "axios";

export const getCouponAll = async () => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api//coupon/all`,
    method: "get",
  });
  return response;
};
export const getUserByCoupon = async (data) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/coupon/search/user`,
    method: "get",
    data: data,
  });
  return response;
};
export const postCoupon = async (data) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/coupon`,
    method: "post",
    data: data,
  });
  return response;
};

export const registeCouponByAll = async (data) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/coupon/issue`,
    method: "post",
    data: data,
  });
  return response;
};
export const registeCouponByUser = async (data) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/coupon/issue/user`,
    method: "post",
    data: data,
  });
  return response;
};
