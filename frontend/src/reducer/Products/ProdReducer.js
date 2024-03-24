import TYPE from "./ProdType";

const initialState = {
  products: [],
  type: null,
  next: null,
  previous: null,
  categories: [],
  product_detail: null,
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
      case TYPE.PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product_detail: payload,
        type: "success",
      };
    case TYPE.CATEGORY_LIST_FAIL:
      return {
        ...state,
        product_detail: payload,
        type: "error",
      };
    default:
      return state;
  }
};

export default ProdReducer;
