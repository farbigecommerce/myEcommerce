import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import CartItemList from "../../Component/Cart/CartItemList";
import OrderSummary from "../../Component/Cart/OrderSummary";
import { Paper } from "@mui/material";

const CartList = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );
  const cartItems = useSelector((state) => state.CartReducer.items);
  const subtotal = useSelector((state) => state.CartReducer.subtotal);

  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem("access")) {
      navigate("/login/");
    }
  }, [isAuthenticated, navigate]);

  const formatCurrency = (number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  const emptyCartContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "55vh",
      }}
    >
      <Paper sx={{ p: 5 }}>
        <Typography sx={{ p: 0, m: 0 }} variant="h4" gutterBottom>
          Carrito Vacío
        </Typography>
        <Typography variant="body1" gutterBottom>
          Visita nuestra lista de productos
        </Typography>
        <Button
          component={Link}
          to="/product/list"
          variant="contained"
          color="primary"
        >
          Ir a Lista de Productos
        </Button>
      </Paper>
    </div>
  );

  return (
    <div>
      <Grid sx={{ pt: { xs: 7, sm: 8, md: 9 } }} container alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" sx={{ pl: 2, my: 2 }}>
            Shopping Cart
          </Typography>
        </Grid>
        <Grid
          item
          xs={false}
          sm={6}
          sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
        >
          {cartItems.length === 0 ? (
            <></>
          ) : (
            <Typography variant="h6" sx={{ pr: 2, my: 2 }}>
              Total Products: {cartItems.length}
            </Typography>
          )}
        </Grid>
      </Grid>

      {cartItems.length === 0 ? (
        emptyCartContent
      ) : (
        <Grid container>
          <Grid item xs={12} md={9} lg={8} sx={{ pl: 2, pr: { xs: 2, md: 0 } }}>
            <CartItemList
              cartItems={cartItems}
              formatCurrency={formatCurrency}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ textAlign: "right", display: { xs: "block", sm: "none" } }}
          >
            <Typography variant="h6" sx={{ pr: 2, my: 2 }}>
              Total Products: {cartItems.length}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            lg={4}
            sx={{ px: { xs: 2, sm: 2 }, pt: { xs: 2, md: 0 }, mb: 3 }}
          >
            <OrderSummary subtotal={subtotal} formatCurrency={formatCurrency} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CartList;
