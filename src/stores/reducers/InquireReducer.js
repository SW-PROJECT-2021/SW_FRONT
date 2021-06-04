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
import { reducerUtils, handleAsyncActions } from "../../utils/asyncUtils";
const initialState = {
  questionlist: reducerUtils.initial(),
  questiondetail: reducerUtils.initial(),
  postanswer: reducerUtils.initial(),
};

export const InquireReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTION_ALL:
    case GET_QUESTION_ALL_SUCCESS:
    case GET_QUESTION_ALL_ERROR:
      return handleAsyncActions(GET_QUESTION_ALL, "questionlist")(
        state,
        action
      );
    case GET_QUESTION_DETAIL:
    case GET_QUESTION_DETAIL_SUCCESS:
    case GET_QUESTION_DETAIL_ERROR:
      return handleAsyncActions(GET_QUESTION_DETAIL, "questiondetail")(
        state,
        action
      );
    case POST_ANSWER:
    case POST_ANSWER_SUCCESS:
    case POST_ANSWER_ERROR:
      return handleAsyncActions(POST_ANSWER, "postanswer")(state, action);
    case POST_ANSWER_CLEAR:
      return { ...state, postanswer: reducerUtils.initial() };
    default:
      return state;
  }
};
