import TYPE from "./CartType";
import axios from "axios";

axios.defaults.withCredentials = true;

const protocol = window.location.protocol; // Get the current protocol
const API_DOMAIN = `${protocol}//${window.location.hostname}:8000`;

export const cartList = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.get(`${API_DOMAIN}/cart/`, config);
    dispatch({
      type: TYPE.CART_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TYPE.CART_LIST_FAIL,
      payload: err.response.data,
    });
  }
};

export const addToCart = (product_variation, quantity) => async (dispatch) => {
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };
  const body = { product_variation, quantity };
  try {
    const res = await axios.post(`${API_DOMAIN}/cart/add/`, body, config);
    dispatch({
      type: TYPE.ADD_TO_CART_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TYPE.ADD_TO_CART_FAIL,
      payload: err.response.data,
    });
  }
};


// Action to update a cart item
export const updateCartItem = (itemId, updateData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };

  try {
    const res = await axios.patch(`${API_DOMAIN}/cart/update/${itemId}/`, updateData, config);
    dispatch({
      type: TYPE.UPDATE_CART_ITEM_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TYPE.UPDATE_CART_ITEM_FAIL,
      payload: err.response.data,
    });
  }
};

// Action to remove an item from the cart
export const removeFromCart = (itemId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.delete(`${API_DOMAIN}/cart/delete/${itemId}/`, config);
    dispatch({
      type: TYPE.REMOVE_FROM_CART_SUCCESS,
      payload: itemId,
    });
  } catch (err) {
    dispatch({
      type: TYPE.REMOVE_FROM_CART_FAIL,
      payload: err.response.data,
    });
  }
};