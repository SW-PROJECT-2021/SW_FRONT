import {
  GET_QUESTION_ALL,
  GET_QUESTION_ALL_SUCCESS,
  GET_QUESTION_ALL_ERROR,
  GET_QUESTION_DETAIL,
  GET_QUESTION_DETAIL_SUCCESS,
  GET_QUESTION_DETAIL_ERROR,
  POST_ANSWER,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_ERROR,
  POST_ANSWER_CLEAR,
} from "../actions/types";
import * as inquireApi from "../api/inquireApi";
export const getQuestionAllAction = () => async (dispatch) => {
  dispatch({ type: GET_QUESTION_ALL });
  try {
    const response = await inquireApi.questionAll();
    console.log(response);
    dispatch({ type: GET_QUESTION_ALL_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: GET_QUESTION_ALL_ERROR, payload: err, error: true });
  }
};
export const getQuestionDetailAction = (id) => async (dispatch) => {
  dispatch({ type: GET_QUESTION_DETAIL });
  try {
    const response = await inquireApi.questionById(id);
    console.log(response);
    dispatch({
      type: GET_QUESTION_DETAIL_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({ type: GET_QUESTION_DETAIL_ERROR, payload: err, error: true });
  }
};

export const postAnswerAction = (data) => async (dispatch) => {
  dispatch({ type: POST_ANSWER });
  try {
    const response = await inquireApi.AnswerByInquire(data);
    console.log(response);
    dispatch({ type: POST_ANSWER_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: POST_ANSWER_ERROR, payload: err, error: true });
  }
};
export const postAnswerClear = () => ({
  type: POST_ANSWER_CLEAR,
});
