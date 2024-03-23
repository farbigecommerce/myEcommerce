import TYPE from "./CartType";

const initialState = {
    items:[],
    subtotal:null,
}

const CartReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case TYPE.CART_LIST_SUCCESS:
            return {
                ...state,
                items:payload.cart_items,
                subtotal:payload.subtotal,
            }
        case TYPE.CART_LIST_FAIL:
            return {
                ...state,
                items:payload,
            }
        default:
            return state;
    }
}

export default CartReducer;