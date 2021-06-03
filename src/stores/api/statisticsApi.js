import axios from "axios";

export const accumulatedSaleAll = async () => {
  const resposne = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/sold`,
    method: "get",
  });
  return resposne;
};

export const accumatedSaleByDate = async (startDate, endDate) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/sold/search?startDate=${startDate}&endDate=${endDate}`,
    method: "get",
  });
  return response;
};

export const accumlatedProductByCount = async (startDate, endDate) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/sold/rank/product?startDate=${startDate}&endDate=${endDate}`,
    method: "get",
  });
  return response;
};

export const accumlatedCategoryByCount = async (startDate, endDate) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/sold/rank/category?startDate=${startDate}&endDate=${endDate}`,
    method: "get",
  });
  return response;
};
