import axios from "axios";

export const questionAll = async () => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/question/all`,
    method: "get",
  });
  return response;
};

export const AnswerByInquire = async (data) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/question/answer`,
    method: "post",
    data: data,
  });
  return response;
};

export const questionById = async (id) => {
  const response = await axios({
    url: `${process.env.REACT_APP_API_BASEURL}/api/question/detail/ ${id}`,
    method: "get",
  });
  return response;
};
