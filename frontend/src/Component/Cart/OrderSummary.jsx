import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

const OrderSummary = ({ subtotal, formatCurrency }) => {
  return (
    <Card>
      <Typography sx={{ m: 1, ml: 2, mt: 2 }} variant="h5" component="div">
        Order Summary
      </Typography>

      <List dense={true}>
        <Divider />
        <ListItem>
          <ListItemText primary="Subtotal" secondary={formatCurrency(subtotal)} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Envío" secondary={formatCurrency(5000)} />
        </ListItem>
        <Divider />
        <Typography
          sx={{ m: 1, ml: 2, mt: 2, fontWeight: 550 }}
          variant="body1"
          component="div"
        >
          Total: {formatCurrency(subtotal + 5000)}
        </Typography>
      </List>
    </Card>
  );
};

export default OrderSummary;
