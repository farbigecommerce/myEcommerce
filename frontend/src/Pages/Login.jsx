import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login, redirect_view } from "../reducer/Actions";
import { Button, TextField, Typography, Container, Grid, Divider } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import GoogleIcon from '@mui/icons-material/Google';



const Login = ({ login,redirect_view, isAuthenticated,responseType, payload }) => {
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [errors, setErrors] = useState({});

  const { email, password } = formData;

  const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlingSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  useEffect(() => {
    if (payload && responseType === "error") {
      setErrors(payload);
    } else if (responseType === "success") {
      redirect_view()
    }
  }, [payload, responseType]);

  const reachGoogle = () => {
    const clientID = "911292354025-iscrk0kofmi5b8vnrb5f2gda2pr2pe4j.apps.googleusercontent.com";
    const callBackURI = "http://localhost:3000/";
    window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`)
  }

  if (isAuthenticated) {
    return <Navigate to={"../"}></Navigate>;
  }

  return (
    <Container component="main" maxWidth="xs">
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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handlingSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          
          <TextField
            margin="normal"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlingInput}
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password : ''}
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
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Divider>OR</Divider>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={reachGoogle}
          > <GoogleIcon sx={{paddingRight:1,fontSize: 28}}></GoogleIcon>
            Sign In With Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={"../reset/password/"} variant="h4">
                {"Forgot password"}
              </Link>
            </Grid>
            <Grid item>
              <Link to={"../signup/"} variant="h5">
              
                {"Don't have an account? Sign Up"}
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
    payload: state.AuthReducer.payload
  };
};

export default connect(mapStateToProps, { login,redirect_view })(Login);
