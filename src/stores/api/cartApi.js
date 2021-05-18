import axios from "axios";

export const UpdateCart = async () => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/basket`,
    method: "get",
  });
  return response;
};

export const DeleteCart = async (id) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/basket/${id}`,
    method: "delete",
  });
  return response;
};

export const ChangeCountCart = async (data) => {
  console.log(data);
  const response = await axios.put(
    `${process.env.REACT_APP_API_BASEURL}/api/basket`,
    data
  );
  console.log(response);
  return response;
};
