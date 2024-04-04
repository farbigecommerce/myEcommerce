import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { Grid, Box, IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import AddressForm from "./AddressForm";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary {...props} /> // Remove the expandIcon prop
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",

  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };

  useEffect(() => {
    // Auto-select the address when it is marked as selected
    const selectedAddressId = props.addresses.find(
      (address) => address.is_selected
    )?.id;
    setSelectedAddress(selectedAddressId || "");
  }, [props.addresses]);

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
  };

  const handleDeleteItem = (id) => {
    // Implement delete logic here
    console.log("Delete item with ID:", id);
  };

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <FormControlLabel
            control={<Radio />}
            checked={expanded === "panel1"}
            onChange={handleChange("panel1")}
          />
          <Typography sx={{ pt: 1 }}>Mis direcciones</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.addresses.map((address, index) => (
            <Box
              key={index}
              onClick={() => handleAddressSelect(address.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border:
                  selectedAddress === address.id
                    ? "2px solid blue"
                    : "1px solid gray",
                borderRadius: "5px",
                padding: "5px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ ml: 1, mt: 1 }}>
                  {address.full_name}
                </Typography>
                <Typography variant="body2" sx={{ ml: 3, mb: 1 }}>
                  {address.address} - {address.state}
                </Typography>
              </Box>
              <IconButton
                sx={{ mr: 1 }}
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteItem(address.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <FormControlLabel
            control={<Radio />}
            checked={expanded === "panel2"}
            onChange={handleChange("panel2")}
          />
          <Typography sx={{ pt: 1 }}>Nueva dirección</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddressForm></AddressForm>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ mb: 2 }}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <FormControlLabel
            control={<Radio />}
            checked={expanded === "panel3"}
            onChange={handleChange("panel3")}
          />
          <Typography sx={{ pt: 1 }}>Retirar en local</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Typography>
              Por favor, sigue estas instrucciones para retirar tu pedido en
              nuestro local:
            </Typography>
            <ol>
              <li>
                Dirígete a nuestra ubicación en{" "}
                <strong>Calle Sacramento 890, Córdoba, Argentina</strong>.
              </li>
              <li>
                Proporciona tu <strong>nombre y apellido</strong> al personal.
              </li>
              <li>
                Presenta tu identificación y el número de pedido al personal.
              </li>
              <li>
                Recoge tu pedido en la sección designada para retiros en local.
              </li>
            </ol>
            <Typography>
              Si tienes alguna pregunta o necesitas asistencia adicional, no
              dudes en contactarnos.
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
