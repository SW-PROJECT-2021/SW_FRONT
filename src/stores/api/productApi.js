import axios from "axios";

export const GetProductList = async () => {
  const response = await axios({
    url: "/product",
    method: "get",
  });
  return response;
};

export const GetProductById = async (id) => {
  const response = await axios({
    url: `/product/select/${id}`,
    method: "get",
  });
  return response;
};

export const PostProduct = async (dataSubmit) => {
  const response = await axios({
    url: "/product",
    method: "post",
    data: dataSubmit,
  });
  return response;
};

export const DeleteProduct = async (id) => {
  const response = await axios({
    url: `/product/${id}`,
    method: "delete",
  });
  return response;
};