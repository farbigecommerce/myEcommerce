import TYPE from "./CartType";

const initialState = {
  items: [],
  subtotal: null,
  addresses: [],
};

const CartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.CART_LIST_SUCCESS:
      return {
        ...state,
        items: payload.cart_items,
        subtotal: payload.subtotal,
      };
    case TYPE.CART_LIST_FAIL:
      return {
        ...state,
        items: payload,
      };
    case TYPE.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        items: payload.cart_items,
        subtotal: payload.subtotal,
      };
    case TYPE.ADD_TO_CART_FAIL:
      return {
        ...state,
        items: payload,
      };

    case TYPE.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
      };
    case TYPE.REMOVE_FROM_CART_FAIL:
      return {
        ...state,
      };
    case TYPE.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
      };
    case TYPE.UPDATE_CART_ITEM_FAIL:
      return {
        ...state,
      };
    case TYPE.ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: payload,
      };
    case TYPE.ADDRESSES_FAIL:
      return {
        ...state,
      };
    case TYPE.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        // addresses: payload,
      };
    case TYPE.ADD_ADDRESS_FAIL:
      return {
        ...state,
      };
    case TYPE.SELECT_ADDRESS_SUCCESS:
      return {
        ...state,
        // addresses: payload,
      };
    case TYPE.SELECT_ADDRESS_FAIL:
      return {
        ...state,
      };
    case TYPE.REMOVE_ADDRESS_SUCCESS:
      return {
        ...state,
        // addresses: payload,
      };
    case TYPE.REMOVE_ADDRESS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default CartReducer;
