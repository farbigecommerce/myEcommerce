import TYPE from "./Type";

const initialState = {
    access: localStorage.getItem('access'),
    isAuthenticated: false,
    user: null,
    message: "",
    payload:{},
    type:"",
}

const AuthReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case TYPE.LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                access: payload.access,
                isAuthenticated: true,
                user: payload.user,
                message: "Login has successed",
                type:"success",
                payload: payload
            }
        case TYPE.LOGIN_FAIL:
            localStorage.removeItem('access');
            return {
                ...state,
                access: null,
                isAuthenticated: false,
                user: null,
                message: "",
                type:"error",
                payload: payload
            }
        case TYPE.VERIFY_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                message: "",
                payload: payload
            }
        case TYPE.VERIFY_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                message: "",
            }
        case TYPE.GET_USER_SUCCESS:
            return {
                ...state,
                user: payload,

            }
        case TYPE.GET_USER_FAIL:
            return {
                ...state,
                user: null
            }
        case TYPE.REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                access: payload.access,
                isAuthenticated: true,
                message: "Refresh token success",
                type:"info",

            }
        case TYPE.REFRESH_FAIL:
            localStorage.removeItem('access');
            return {
                ...state,
                access: null,
                isAuthenticated: false,
                user: null,
                message: "Refresh token fail"
            }
        case TYPE.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                message: "Change password success",
                type:"success",
                payload: payload,
            }
        case TYPE.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                message: "",
                type:"error",
                payload: payload,
            }
        case TYPE.SIGNUP_SUCCESS:
            return {
                ...state,
                type:"success",
                payload: payload,
                message: "Verification link has sent to your email"
            }
        case TYPE.SIGNUP_FAIL:
            return {
                ...state,
                type:"error",
                payload: payload,
                message: ""
            }
        case TYPE.ACTIVATE_ACCTOUNT_SUCCESS:
            return {
                ...state,
                message: "Your account has been verified",
                type:"success",
            }
        case TYPE.ACTIVATE_ACCTOUNT_FAIL:
            return {
                ...state,
                message: "Verification account has failed",
                type:"error",
            }
        case TYPE.RESET_SUCCESS:
            return {
                ...state,
                message: "Reset password success",
                type:"success",
                payload: payload,
            }
        case TYPE.RESET_FAIL:
            return {
                ...state,
                message: "Reset password fail",
                type:"error",
                payload: payload,
            }
        case TYPE.SET_SUCCESS:
            return {
                ...state,
                message: "Your new password has been setted",
                type:"success",
                payload: payload,
            }
        case TYPE.SET_FAIL:
            return {
                ...state,
                message: "Set new password failed",
                type:"error",
                payload: payload,
            }
        case TYPE.LOGOUT:
            localStorage.removeItem('access');
            return {
                ...state,
                access: null,
                isAuthenticated: false,
                user: null,
                type: "info",
                message: "User has logged out",
            }
        case TYPE.CLOSE_ALERT:
            return {
                ...state,
                type: "",
                message: ""
            }
        case TYPE.REDIRECT_VIEW:
                return {
                    ...state,
                    type: "",
                    message: ""
                }
        case TYPE.GUEST_VIEW:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default AuthReducer;