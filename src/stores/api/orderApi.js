import axios from "axios";

export const GetOrderList = async () => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/orderHistory/all`,
    method: "get",
  });
  return response;
};
export const FilterOrderList = async (startDate, endDate) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/orderHistory/search/all?startDate=${startDate}&endDate=${endDate}`,
    method: "get",
  });
  return response;
};
export const UpdateOrderState = async (id) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/orderHistory/raiseStatus`,
    method: "put",
    headers: {
      "Context-Type": "application/x-www-form-urlencoded",
    },
    data: id,
  });
  return response;
};

export const OrderReview = async (id) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/review/${id}`,
    method: "get",
  });
  return response;
};
