import { CHANGE_COUNT_CART, DELETECART, UPDATECART } from "../actions/types";

const initialState = [];

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATECART:
      return [...action.payload];
    case DELETECART:
      return state.filter((data) => data.ProductId !== action.payload);
    case CHANGE_COUNT_CART:
      return state.map((item) => {
        if (item.ProductId === action.payload.ProductId) {
          item.count = action.payload.count;
        }
        return item;
      });
    default:
      return state;
  }
};
