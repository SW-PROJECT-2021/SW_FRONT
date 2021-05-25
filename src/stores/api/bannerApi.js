import axios from "axios";

export const GetBanners = async () => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/banner/available`,
    method: "get",
  });
  return response;
};

export const GetBannerById = async (id) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/banner/select/${id}`,
    method: "get",
  });
  return response;
};
export const PostBanner = async (dataSubmit) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/banner`,
    method: "post",
    data: dataSubmit,
  });
  return response;
};

export const SortBanner = async (dataSubmit) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/banner/sort`,
    method: "post",
    data: dataSubmit,
  });
  return response;
};

export const SearchBanner = async (startDate) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/banner/search/${startDate}`,
    method: "get",
  });
  return response;
};

export const UpdateBanner = async (dataSubmit) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/banner`,
    method: "put",
    data: dataSubmit,
  });
  return response;
};
