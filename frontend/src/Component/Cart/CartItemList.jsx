import React from "react";
import { useDispatch } from "react-redux";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import TableContainer from "@mui/material/TableContainer"; // Import TableContainer
import Table from "@mui/material/Table"; // Import Table
import TableHead from "@mui/material/TableHead"; // Import TableHead
import TableBody from "@mui/material/TableBody"; // Import TableBody
import Paper from "@mui/material/Paper"; // Import Paper

import { removeFromCart,cartList } from "../../reducer/Cart/CartActions";

import { useSelector } from "react-redux";

const protocol = window.location.protocol; // Get the current protocol
const backend_domain = `${protocol}//${window.location.hostname}:8000`;

const CartItemList = ({ formatCurrency }) => {
  const cartItems = useSelector((state) => state.CartReducer.items); // Assuming items are in CartReducer
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

  return (
    <>
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
                key={item.id} // Ensure unique key prop
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
                        src={
                          backend_domain +
                          item.product_variation.product.pictures[0].image
                        }
                      />
                    </Grid>
                    <Grid item>
                      {item.product_variation.product.name} |{" "}
                      {item.product_variation.name}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(item.product_variation.prices?.[0]?.price)}
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">
                  {formatCurrency(
                    item.product_variation.prices?.[0]?.price * item.quantity
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CartItemList;
