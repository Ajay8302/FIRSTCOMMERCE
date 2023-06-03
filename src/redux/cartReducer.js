
const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    //Case 1 for Adding Data in Cart(Local storage)
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };


      //Case 1 for Deleting Data From Cart(Local storage)
      case "Delete_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(obj=>obj.id !== action.payload.id)
      };

    default:
      return state;
  }
};
  