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
