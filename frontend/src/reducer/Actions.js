
import TYPE from "./Type";
import axios from "axios";
import { cartList } from "./Cart/CartActions";
axios.defaults.withCredentials = true;

const protocol = window.location.protocol; // Get the current protocol
const API_DOMAIN = `${protocol}//${window.location.hostname}:8000`;

export const closeAlert = () => (dispatch) => {
  dispatch({
    type: TYPE.CLOSE_ALERT,
  });
};

export const redirect_view = () => (dispatch) => {
  dispatch({
    type: TYPE.REDIRECT_VIEW,
  });
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      `${API_DOMAIN}/dj-rest-auth/login/`,
      body,
      config
    );
    dispatch({
      type: TYPE.LOGIN_SUCCESS,
      payload: res.data,
    });
    await dispatch(cartList()); // Obtaining Cart Items when login in

  } catch (err) {
    // Handle different types of errors here
    if (err.response && err.response.data) {
      // If there's an error response from the server
      dispatch({
        type: TYPE.LOGIN_FAIL,
        payload: err.response.data,
      });
    } else {
      // If there's a network error or other errors
      dispatch({
        type: TYPE.LOGIN_FAIL,
        payload: { error: "An error occurred. Please try again later." },
      });
    }
  }
};

export const verify = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      await axios.post(
        `${API_DOMAIN}/dj-rest-auth/token/verify/`,
        body,
        config
      );
      dispatch({
        type: TYPE.VERIFY_SUCCESS,
        payload: "",
        message: "",
      });
      await dispatch(cartList()); // Obtaining Cart Items when login in
    } catch (err) {
      dispatch({
        type: TYPE.VERIFY_FAIL,
        payload: "",
        message: "",
      });
      await dispatch(refresh());
    }
  } else {
    dispatch({
      type: TYPE.GUEST_VIEW,
    });
  }
};

export const getUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(`${API_DOMAIN}/dj-rest-auth/user/`, config);
      dispatch({
        type: TYPE.GET_USER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TYPE.GET_USER_FAIL,
      });
    }
  } else {
    dispatch({
      type: TYPE.GUEST_VIEW,
    });
  }
};

export const refresh = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${API_DOMAIN}/dj-rest-auth/token/refresh/`,
        config
      );
      dispatch({
        type: TYPE.REFRESH_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TYPE.REFRESH_FAIL,
      });
    }
    await dispatch(cartList());
  } else {
    dispatch({
      type: TYPE.GUEST_VIEW,
    });
  }
};

export const changePassword =
  (new_password1, new_password2, old_password) => async (dispatch) => {
    await dispatch(verify());
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    const body = JSON.stringify({ new_password1, new_password2, old_password });
    try {
      const res = await axios.post(
        `${API_DOMAIN}/dj-rest-auth/password/change/`,
        body,
        config
      );
      dispatch({
        type: TYPE.CHANGE_PASSWORD_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({
          type: TYPE.CHANGE_PASSWORD_FAIL,
          payload: err.response.data,
        });
      }
    }
  };

export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.post(`${API_DOMAIN}/dj-rest-auth/logout/`, config);
    dispatch({
      type: TYPE.LOGOUT,
    });
  } catch (err) {
    dispatch({
      type: TYPE.LOGOUT,
    });
  }
};

export const signup =
  (email, first_name, last_name, password1, password2) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      first_name,
      last_name,
      password1,
      password2,
    });
    try {
      const res = await axios.post(
        `${API_DOMAIN}/dj-rest-auth/registration/`,
        body,
        config
      );
      dispatch({
        type: TYPE.SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({
          type: TYPE.SIGNUP_FAIL,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: TYPE.SIGNUP_FAIL,
          payload: { error: "An error occurred. Please try again later." },
        });
      }
    }
  };

export const emailVerification = (key) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ key });
  try {
    await axios.post(
      `${API_DOMAIN}/dj-rest-auth/registration/verify-email/`,
      body,
      config
    );
    dispatch({
      type: TYPE.ACTIVATE_ACCTOUNT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: TYPE.ACTIVATE_ACCTOUNT_FAIL,
    });
  }
};

export const resetPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.post(
      `${API_DOMAIN}/dj-rest-auth/password/reset/`,
      body,
      config
    );
    dispatch({
      type: TYPE.RESET_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TYPE.RESET_FAIL,
      payload: err.response.data,
    });
  }
};

export const resetPasswordConfirm =
  (uid, token, new_password1, new_password2) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token, new_password1, new_password2 });
    try {
      const res = await axios.post(
        `${API_DOMAIN}/dj-rest-auth/password/reset/confirm/`,
        body,
        config
      );
      dispatch({
        type: TYPE.SET_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TYPE.SET_FAIL,
        payload: err.response.data,
      });
    }
  };

export const googleLogin = (code) => async (dispatch) => {
  if (!localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ code });
    try {
      const res = await axios.post(
        `${API_DOMAIN}/dj-rest-auth/google/`,
        body,
        config
      );
      dispatch({
        type: TYPE.LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TYPE.LOGIN_FAIL,
      });
    }
  } else {
    dispatch(verify());
    dispatch(getUser());
  }
};
