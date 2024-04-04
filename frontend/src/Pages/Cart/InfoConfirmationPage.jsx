import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutStepper from "../../Component/Cart/CheckoutStepper";
import OrderSummary from "../../Component/Cart/OrderSummary";
import Button from "@mui/material/Button";
import EastIcon from "@mui/icons-material/East";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch } from "react-redux";

import DeliveryForm from "../../Component/Cart/Step2/DeliveryForm";
import CustomizedAccordions from "../../Component/Cart/Step2/SelectDeliveryTabs";

import { addressesList } from "../../reducer/Cart/CartActions";

function InfoConfirmationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );

  const cartItems = useSelector((state) => state.CartReducer.items);
  const subtotal = useSelector((state) => state.CartReducer.subtotal);

  const addresses = useSelector((state) => state.CartReducer.addresses);

  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem("access")) {
      navigate("/login/");
    }
    dispatch(addressesList())
      .then(() => {
      })
      .catch((error) => {
        console.log("Error");
      });
  }, [isAuthenticated, navigate]);

  const formatCurrency = (number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  return (
    <>
      <Grid container alignItems="center" sx={{ pt: { xs: 7, sm: 8, md: 9 } }}>
        <Grid item sx={{ ml: 2, mr: 1 }}>
          <Link to="/cart">
            <ArrowBackIosIcon />
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{ my: 2 }}>
            Forma de Entrega
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            my: { xs: 1, md: 2 },
            mb: { xs: 2, md: 4 },
            mx: { xs: 2, md: 4 },
          }}
        >
          <CheckoutStepper step={1}></CheckoutStepper>
        </Grid>
        <Grid item xs={12} md={9} lg={8} sx={{ pl: 2, pr: { xs: 2, md: 0 } }}>
          <CustomizedAccordions addresses={addresses}></CustomizedAccordions>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          lg={4}
          sx={{ px: { xs: 2, sm: 2 }, pt: { xs: 2, md: 0 }, mb: 3 }}
        >
          <OrderSummary subtotal={subtotal} formatCurrency={formatCurrency} />
          <Link to="/cart/confirmation/">
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 2,
                width: "100%", // Stretch button to container width
              }}
              endIcon={<EastIcon />}
            >
              SIGUIENTE
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default InfoConfirmationPage;
