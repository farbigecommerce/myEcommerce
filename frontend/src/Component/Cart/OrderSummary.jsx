import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

const OrderSummary = ({ subtotal, envio, formatCurrency }) => {
  return (
    <Card sx={{ backgroundColor: "#1e88e5" }}>
      <List dense={true}>
        <Typography
          sx={{
            pt: 1,
            pb: 2,
            px: 2,
            fontWeight: "bold",
            color: "white",
          }}
          variant="h5"
          component="div"
        >
          Resumen
        </Typography>

        <Divider />
        <ListItem
          sx={{
            backgroundColor: "white",
          }}
        >
          <ListItemText
            primary="Subtotal"
            secondary={formatCurrency(subtotal)}
          />
        </ListItem>
        {envio !== undefined && (
          <>
            <Divider />
            <ListItem
              sx={{
                backgroundColor: "white", // Background color
              }}
            >
              <ListItemText primary="Envío" secondary={formatCurrency(envio)} />
            </ListItem>
          </>
        )}
        <Divider />
        <Typography
          sx={{ m: 1, ml: 2, mt: 2, fontWeight: 550, color: "white" }}
          variant="body1"
          component="div"
        >
          Total: {formatCurrency(subtotal + (envio ? envio : 0))}
        </Typography>
      </List>
    </Card>
  );
};

export default OrderSummary;
