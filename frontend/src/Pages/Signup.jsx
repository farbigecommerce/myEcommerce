import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { signup,redirect_view } from "../reducer/Actions";
import { Button, TextField, Typography, Container, Grid} from "@mui/material"; //FormControlLabel, Checkbox 
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

const Signup = ({ signup, responseType, payload, isAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password1: "",
    password2: ""
  });

  const [errors, setErrors] = useState({});

  const { email, first_name, last_name, password1, password2 } = formData;

  const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const [redirectView, setRedirectView] = useState(false);

  const handlingSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, first_name, last_name, password1, password2);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  useEffect(() => {
    if (payload && responseType === "error") {
      setErrors(payload);
    } 
    if (responseType === "success") {
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5"
        sx={{
            marginBottom: 2,
          }}>
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handlingSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={first_name}
                onChange={handlingInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                value={last_name}
                onChange={handlingInput}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handlingInput}
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="new-password"
                value={password1}
                onChange={handlingInput}
                error={errors.password1 ? true : false}
                helperText={errors.password1 ? errors.password1 : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="new-password"
                value={password2}
                onChange={handlingInput}
                error={errors.password2 ? true : false}
                helperText={errors.password2 ? errors.password2 : ''}
              />
            </Grid>
            {errors.non_field_errors && (
            <Typography variant="body2" color="error" gutterBottom>
              {errors.non_field_errors[0]}
            </Typography>
          )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="../login/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {

    return {
      isAuthenticated: state.AuthReducer.isAuthenticated,
      responseType: state.AuthReducer.type,
      payload: state.AuthReducer.payload,
      message: state.AuthReducer.message,
    };
  };

export default connect(mapStateToProps, { signup })(Signup);
