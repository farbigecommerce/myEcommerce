import TYPE from "./ProdType";
import axios from "axios";
axios.defaults.withCredentials = true;

const protocol = window.location.protocol; // Get the current protocol
const API_DOMAIN = `${protocol}//${window.location.hostname}:8000`;

export const productList =
  (page = 1, search_text = "", categories) =>
  async (dispatch) => {
    try {
      const params = {
        search: search_text,
        categories: categories,
      };

      let res = {};
      if (page <= 1) {
        params.page = page;
        res = await axios.get(`${API_DOMAIN}/product/list/`, { params });
      } else {
        res = await axios.get(`${API_DOMAIN}/product/list/`, {
          params: { ...params, page },
        });
      }

      dispatch({
        type: TYPE.PRODUCT_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TYPE.PRODUCT_LIST_FAIL,
        payload: err.response.data,
      });
    }
  };

export const fetchCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_DOMAIN}/product/categories/`);
    dispatch({
      type: TYPE.CATEGORY_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TYPE.CATEGORY_LIST_FAIL,
      payload: err.response.data,
    });
  }
};

export const productDetail = (product_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.get(
      `${API_DOMAIN}/product/detail/${product_id}`,
      config
    );
    dispatch({
      type: TYPE.PRODUCT_DETAIL_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TYPE.PRODUCT_DETAIL_FAIL,
      payload: err.response.data,
    });
  }
};

