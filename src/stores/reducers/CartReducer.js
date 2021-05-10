import { UPDATECART } from "../actions/types";

const initialState = [];

export const CartReducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATECART:
         return [...action.payload];
      default:
         return state;
   }
};
