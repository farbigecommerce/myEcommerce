import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword, redirect_view } from "../reducer/Actions";
import { Button, Typography, Container, TextField, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const ResetPassword = ({ resetPassword, responseType, payload }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: ""
  });

  const [errors, setErrors] = useState({});
  const [redirectView, setRedirectView] = useState(false);

  const { email } = formData;

  const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlingSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  useEffect(() => {
    if (payload && responseType === "error") {
      setErrors(payload);
    } else if (responseType === "success") {
      setRedirectView(true);
    }
  }, [payload, responseType]);

  useEffect(() => {
    if (redirectView) {
      redirect_view();
      setRedirectView(false);
      navigate('/');
    }
  }, [redirectView, navigate]);

  return (
    <Container sx={{pt:{xs:7,sm:8,md:9,}}} component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography component="h2" variant="h5" sx={{ marginBottom: 2 }}>
          Reset Password
        </Typography>
        <Typography component="h5" variant="subtitle1" sx={{ marginBottom: 4 }}>
          Please input your registered email. The link to set your new password will be sent to your email.
        </Typography>
        <Box component="form" onSubmit={handlingSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handlingInput}
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email : ''}
          />
          {errors.non_field_errors && (
            <Typography variant="body2" color="error" gutterBottom>
              {errors.non_field_errors[0]}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
          >
            Send Link
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    responseType: state.AuthReducer.type,
    payload: state.AuthReducer.payload
  };
};

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
