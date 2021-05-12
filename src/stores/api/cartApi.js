import axios from "axios";

export const UpdateCart = async () => {
   const response = await axios({
      url: "/basket",
      method: "get",
   });
   return response;
};

export const DeleteCart = async (id) => {
   const response = await axios({
      url: `/basket/${id}`,
      method: "delete",
   });
   return response;
};

export const ChangeCountCart = async (data) => {
   console.log(data);
   const response = await axios.put("/basket", data);
   console.log(response);
   return response;
};
