import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ProdReducer from "./Products/ProdReducer";
import CartReducer from "./Cart/CartReducer";

const MainReducer = combineReducers({
    AuthReducer,
    ProdReducer,
    CartReducer,
});

export default MainReducer;