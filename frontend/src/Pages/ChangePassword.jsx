import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { changePassword, redirect_view } from "../reducer/Actions";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";

const ChangePassword = ({ isAuthenticated, changePassword, responseType, payload, user }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        new_password1: "",
        new_password2: "",
        old_password: ""
    });

    const [errors, setErrors] = useState({});

    const { new_password1, new_password2, old_password } = formData;

    const handlingInput = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handlingSubmit = async (e) => {
        e.preventDefault();
        await changePassword(new_password1, new_password2, old_password);
    };

    const [redirectView, setRedirectView] = useState(false);
    
    useEffect(() => {
        if (payload && responseType === "error") {
          setErrors(payload);
        } else if (responseType === "success" && payload !== "") {
            setRedirectView(true);
        }
      }, [payload, responseType]);

    useEffect(() => {
        if (!isAuthenticated && !localStorage.getItem('access')) {
            navigate('/login/');
        }  
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (redirectView) {
            redirect_view()
            setRedirectView(false);
            navigate('/');
        }
    }, [redirectView]);

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
                <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                    Change Password
                </Typography>
                <Box component="form" onSubmit={handlingSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="new_password1"
                        label="New Password"
                        name="new_password1"
                        type="password"
                        autoFocus
                        value={new_password1}
                        onChange={handlingInput}
                        error={errors.new_password1 ? true : false}
                        helperText={errors.new_password1 ? errors.new_password1 : ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="new_password2"
                        label="Re New Password"
                        name="new_password2"
                        type="password"
                        value={new_password2}
                        onChange={handlingInput}
                        error={errors.new_password2 ? true : false}
                        helperText={errors.new_password2 ? errors.new_password2 : ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="old_password"
                        label="Old Password"
                        name="old_password"
                        type="password"
                        value={old_password}
                        onChange={handlingInput}
                        error={errors.old_password ? true : false}
                        helperText={errors.old_password ? errors.old_password : ''}
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
                        Change Password
                    </Button>
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
        user: state.AuthReducer.user,
    };
};

export default connect(mapStateToProps, { changePassword })(ChangePassword);
