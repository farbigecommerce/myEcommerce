import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChangePassword from "./Pages/ChangePassword";
import EmailVerification from "./Pages/EmailVerification";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import ResetPasswordConfirm from "./Pages/ResetPasswordConfirm";
import Signup from "./Pages/Signup";
import ProductList from "./Pages/Products/ProductList";
import Layout from "./High Order Function/Layout";
import "./css/main.css";
import { Provider } from "react-redux";
import Store from "./Store";
import CartList from "./Pages/Cart/CartList";

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Layout>
          <Routes>
            
            <Route exact path="/" element={<Home />} />
            
            {/* ACCOUNTS */}
            <Route path="login/" element={<Login />} />
            <Route path="signup/" element={<Signup />} />
            <Route path="change/password/" element={<ChangePassword />} />
            <Route path="reset/password/" element={<ResetPassword />} />
            <Route path="dj-rest-auth/registration/account-confirm-email/:key/" element={<EmailVerification />} />
            <Route path="reset/password/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
            
            {/* PRODUCTS */}
            <Route path="product/list/" element={<ProductList />} />

            {/* Cart */}
            <Route path="cart/" element={<CartList />} />

          </Routes>
        </Layout>
      </Router>

    </Provider>
  )
}

export default App