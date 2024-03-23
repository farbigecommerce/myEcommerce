import TYPE from "./ProdType";

const initialState = {
  products: [],
  type: null,
  next: null,
  previous: null,
  categories: [],
};

const ProdReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: payload.results,
        next: payload.next,
        previous: payload.previous,
        type: "success",
      };
    case TYPE.PRODUCT_LIST_FAIL:
      return {
        ...state,
        products: payload,
        type: "error",
      };
    case TYPE.CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categories: payload,
        type: "success",
      };
    case TYPE.CATEGORY_LIST_FAIL:
      return {
        ...state,
        categories: payload,
        type: "error",
      };
    default:
      return state;
  }
};

export default ProdReducer;
