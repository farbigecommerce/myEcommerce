import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Stack, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { ButtonGroup, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  removeFromCart,
  cartList,
  updateCartItem,
} from "../../reducer/Cart/CartActions";
import { useSelector } from "react-redux";

const protocol = window.location.protocol;
const backend_domain = `${protocol}//${window.location.hostname}:8000`;

const CartItemList = ({ formatCurrency }) => {
  const cartItems = useSelector((state) => state.CartReducer.items);
  const dispatch = useDispatch();

  const handleDeleteItem = (itemId) => {
    dispatch(removeFromCart(itemId))
      .then(() => {
        dispatch(cartList());
      })
      .catch((error) => {
        console.error("Error handling delete item:", error);
      });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(updateCartItem(itemId, { quantity: newQuantity }))
      .then(() => {
        dispatch(cartList());
      })
      .catch((error) => {
        console.error("Error handling delete item:", error);
      });
  };

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isMediumScreen && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          Listado
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#1e88e5" }}>
            {!isMediumScreen && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Producto
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Precio
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Cantidad
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Total
                  </Typography>
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Avatar
                          alt={item.product_variation.product.name}
                          src={
                            backend_domain +
                            item.product_variation.product.pictures[0].image
                          }
                        />
                      </Grid>
                      <Grid item>
                        <>
                          <Typography
                            variant="body1"
                            sx={{ display: "inline", mb: 1 }}
                          >
                            {item.product_variation.product.name}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {item.product_variation.name}
                          </Typography>
                        </>
                      </Grid>
                    </Grid>
                  </TableCell>
                  {!isMediumScreen ? (
                    <>
                      <TableCell align="center">
                        {formatCurrency(
                          item.product_variation.prices?.[0]?.price
                        )}
                      </TableCell>

                      <TableCell align="center">
                        <ButtonGroup
                          variant="contained"
                          size="small"
                          aria-label="Small button group"
                        >
                          <Button
                            sx={{ minWidth: "auto" }}
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={
                              item.quantity <= 1
                                ? true
                                : false
                            }
                          >
                            <RemoveIcon sx={{ fontSize: 16 }} />
                          </Button>
                          <Button variant="outlined" sx={{ minWidth: "auto" }}>
                            {item.quantity}
                          </Button>
                          <Button
                            sx={{ minWidth: "auto" }}
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            disabled={
                              item.product_variation.quantity === item.quantity
                                ? true
                                : false
                            } // Disable the button if item.product_variation.quantity is equal to item.quantity or if X is true
                          >
                            <AddIcon sx={{ fontSize: 16 }} />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="center">
                        {formatCurrency(
                          item.product_variation.prices?.[0]?.price *
                            item.quantity
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="right">
                        <Grid container>
                          <Grid item xs={12}>
                            <ButtonGroup
                              variant="contained"
                              size="small"
                              aria-label="Small button group"
                            >
                              {item.quantity === 1 ? (
                                <Button
                                  sx={{ minWidth: "auto" }}
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  <DeleteIcon sx={{ fontSize: 16 }} />
                                </Button>
                              ) : (
                                <Button
                                  sx={{ minWidth: "auto" }}
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                >
                                  <RemoveIcon sx={{ fontSize: 16 }} />
                                </Button>
                              )}
                              <Button
                                variant="outlined"
                                sx={{ minWidth: "auto" }}
                              >
                                {item.quantity}
                              </Button>
                              <Button
                                sx={{ minWidth: "auto" }}
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                disabled={
                                  item.product_variation.quantity === item.quantity
                                    ? true
                                    : false
                                }
                              >
                                <AddIcon sx={{ fontSize: 16 }} />
                              </Button>
                            </ButtonGroup>
                          </Grid>
                          <Grid item xs={12} sx={{ pt: 1 }}>
                            {formatCurrency(
                              item.product_variation.prices?.[0]?.price *
                                item.quantity
                            )}
                          </Grid>
                        </Grid>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CartItemList;
