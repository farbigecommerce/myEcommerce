import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function BottomTab() {
  const [open, setOpen] = useState(false);

  // Sample subtotals data
  const subtotals = [
    { label: "Subtotal 1", amount: 10.5 },
    { label: "Subtotal 2", amount: 20.75 },
    { label: "Subtotal 3", amount: 15.25 },
  ];

  // Sample checkout function
  const handleCheckout = () => {
    console.log("Proceed to checkout");
  };

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const totalAmount = subtotals
    ? subtotals.reduce((total, subtotal) => total + subtotal.amount, 0)
    : 0;

  return (
    <>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 2,
          },
        }}
      >
        {subtotals &&
          subtotals.map((subtotal, index) => (
            <Typography key={index} variant="body1">
              {subtotal.label}: ${subtotal.amount.toFixed(2)}
            </Typography>
          ))}
        <Button variant="contained" onClick={handleCheckout} sx={{ mt: 2 }}>
          Proceed to Checkout
        </Button>
      </Drawer>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          marginX: 1,
          backgroundColor: '#f0f0f0',
          padding: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 8, // Round top-left corner
          borderTopRightRadius: 8, // Round top-right corner
        }}
      >
        <Typography variant="h6">Total: ${totalAmount.toFixed(2)}</Typography>
        <IconButton onClick={handleToggleDrawer}>
          <ExpandLessIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default BottomTab;
