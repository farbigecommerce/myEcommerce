import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
// import { addDeliveryInfo } from "./redux/actions"; // Import your Redux action creator

export default function AddressForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    postalCode: "",
    province: "",
    district: "",
    locality: "",
    address: "",
    apartment: "",
    phoneNumber: "",
    instructions: "",
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            id="fullName"
            name="fullName"
            label="Nombre Completo"
            fullWidth
            variant="outlined"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="postalCode"
            name="postalCode"
            label="Código Postal"
            fullWidth
            variant="outlined"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="province"
            name="province"
            label="Provincia"
            fullWidth
            variant="outlined"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="district"
            name="district"
            label="Partido"
            fullWidth
            variant="outlined"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="locality"
            name="locality"
            label="Localidad"
            fullWidth
            variant="outlined"
            value={formData.locality}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Dirección"
            fullWidth
            variant="outlined"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="apartment"
            name="apartment"
            label="Departamento"
            fullWidth
            variant="outlined"
            value={formData.apartment}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Teléfono"
            fullWidth
            variant="outlined"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="instructions"
            name="instructions"
            label="Indicaciones"
            fullWidth
            variant="outlined"
            value={formData.instructions}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button sx={{mt:2}} type="submit" variant="contained" color="success">
        VALIDAR DIRECCIÓN
      </Button>
    </form>
  );
}
