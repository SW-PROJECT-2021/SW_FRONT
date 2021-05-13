import axios from "axios";

export const GetProductList = async () => {
   const response = await axios({
      url: "http://15.164.20.183:3003/api/product",
      method: "get",
   });
   return response;
};

export const GetProductById = async (id) => {
   const response = await axios({
      url: `http://15.164.20.183:3003/api/product/select/${id}`,
      method: "get",
   });
   return response;
};

export const PostProduct = async (dataSubmit) => {
   const response = await axios({
      url: "http://15.164.20.183:3003/api/product",
      method: "post",
      data: dataSubmit,
   });
   return response;
};

export const DeleteProduct = async (id) => {
   const response = await axios({
      url: `http://15.164.20.183:3003/api/product/${id}`,
      method: "delete",
   });
   return response;
};

export const UpdateProduct = async (dataSubmit) => {
   const response = await axios({
      url: "http://15.164.20.183:3003/api/product",
      method: "put",
      data: dataSubmit,
   });

   return response;
};

export const SearchProduct = async (data) => {
   const response = await axios({
      url: `http://15.164.20.183:3003/api/product/search/detail?title=${data}&category=&minPrice=&maxPrice=`,
      method: "get",
   });
   return response;
};
