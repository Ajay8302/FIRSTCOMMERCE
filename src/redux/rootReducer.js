
import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
  cartReducer : cartReducer, // Shorthand property name
});

export default rootReducer;
