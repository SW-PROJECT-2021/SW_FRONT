import axios from "axios";

export const GetBanners = async () => {
   const response = await axios({
      url: "http://15.164.20.183:3003/banner/available",
      method: "get",
   });
   return response;
};

export const GetBannerById = async (id) => {
   const response = await axios({
      url: `http://15.164.20.183:3003/banner/select/${id}`,
      method: "get",
   });
   return response;
};
export const PostBanner = async (dataSubmit) => {
   const response = await axios({
      url: "http://15.164.20.183:3003/banner",
      method: "post",
      data: dataSubmit,
   });
   return response;
};
