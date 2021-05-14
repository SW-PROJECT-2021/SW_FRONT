import axios from "axios";

export const GetBanners = async () => {
   const response = await axios({
      url: "/api/banner/available",
      method: "get",
   });
   return response;
};

export const GetBannerById = async (id) => {
   const response = await axios({
      url: `/api/banner/select/${id}`,
      method: "get",
   });
   return response;
};
export const PostBanner = async (dataSubmit) => {
   const response = await axios({
      url: "/api/banner",
      method: "post",
      data: dataSubmit,
   });
   return response;
};
