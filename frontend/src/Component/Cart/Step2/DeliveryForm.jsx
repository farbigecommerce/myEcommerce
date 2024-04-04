import React from "react";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";

function DeliveryForm() {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Elige método de envío
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ pb:2, pr: { md: 2 }, }}>
          <TextField
            id="outlined-basic"
            label="Nombre Completo"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ pb:2}}>
          <TextField
            id="outlined-basic"
            label="Código Postal"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ pb:2, pr: { md: 2 }, }}>
          <TextField
            id="outlined-basic"
            label="Provincia"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ pb:2, pr: { md: 2 }, }}>
          <TextField
            id="outlined-basic"
            label="Partido"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ pb:2}}>
          <TextField
            id="outlined-basic"
            label="Localidad"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ pb:2, pr: { md: 2 }, }}>
          <TextField
            id="outlined-basic"
            label="Departamento"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ pb:2}}>
          <TextField
            id="outlined-basic"
            label="Teléfono"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sx={{ pb:2}}>
          <TextField
            id="outlined-basic"
            label="Indicaciones"
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default DeliveryForm;
