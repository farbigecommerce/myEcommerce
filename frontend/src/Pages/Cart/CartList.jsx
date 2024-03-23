import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card, Divider, Grid, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";


const protocol = window.location.protocol; // Get the current protocol
const backend_domain = `${protocol}//${window.location.hostname}:8000`;

function CartList({ isAuthenticated, cartItems, subtotal }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem("access")) {
      navigate("/login/");
    }
  }, [isAuthenticated, navigate]); // Add dependencies to the useEffect hook

  const formatCurrency = (number) => {
    // Function to format numbers as currency with commas and decimals
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS", // Replace with your desired currency code
    }).format(number);
  };

  // https://mui.com/material-ui/react-stepper/

  return (
    <div >
      <Grid sx={{pt:{xs:7,sm:8,md:9,}}} container alignItems="center">
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
          <Typography variant="h6" sx={{ pr: 2, my: 2 }}>
            Total Products: {cartItems.length}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={8} sx={{ pl: 2, pr: { xs: 2, md: 0 } }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <Checkbox
                        sx={{ p: 0, m: 0 }}
                        size="small"
                        checked={item.is_selected}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <Avatar
                            alt={item.product_variation.product.name}
                            src={backend_domain + item.product_variation.product.pictures[0].image}
                          />
                        </Grid>
                        <Grid item>
                          {item.product_variation.product.name} | {item.product_variation.name}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrency(item.product_variation.prices?.[0]?.price)}
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">
                      {formatCurrency(item.product_variation.prices?.[0]?.price * item.quantity)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ textAlign: "right", display: { xs: "block", sm: "none" } }}
        >
          <Typography variant="h6" sx={{ pr: 2, my: 2 }}>
            Total Products: {cartItems.length}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ px: { xs: 2, sm: 2 }, pt: { xs: 2, md: 0 }, mb: 3 }}
        >
          <Card>
            <Typography
              sx={{ m: 1, ml: 2, mt: 2 }}
              variant="h5"
              component="div"
            >
              Order Summary
            </Typography>

            <List dense={true}>
              <Divider></Divider>
              <ListItem>
                <ListItemText
                  primary="Subtotal"
                  secondary={formatCurrency(subtotal)}
                />
              </ListItem>
              <Divider></Divider>
              <ListItem>
                <ListItemText
                  primary="Envío"
                  secondary={formatCurrency(5000)}
                />
              </ListItem>
              <Divider></Divider>
              <Typography
                sx={{ m: 1, ml: 2, mt: 2, fontWeight: 550 }}
                variant="body1"
                component="div"
              >
                Total: {formatCurrency(subtotal + 5000)}
              </Typography>
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    cartItems: state.CartReducer.items,
    subtotal: state.CartReducer.subtotal,
  };
};

export default connect(mapStateToProps)(CartList);
