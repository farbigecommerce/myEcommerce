import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { resetPasswordConfirm } from "../reducer/Actions";
import { Button, Typography, Container, TextField, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const ResetPasswordConfirm = ({ resetPasswordConfirm, responseType, payload }) => {
    const navigate = useNavigate();
    const { uid, token } = useParams();

    const [formData, setFormData] = useState({
        new_password1: "",
        new_password2: ""
    });

    const { new_password1, new_password2 } = formData;
    const [errors, setErrors] = useState({});

    const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlingSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPasswordConfirm(uid, token, new_password1, new_password2);
        } catch (error) {
            console.error("Submission failed:", error);
        }
    };

    useEffect(() => {
        if (payload && responseType === "error") {
            setErrors(payload);
        }
    }, [payload, responseType]);

    useEffect(() => {
        if (responseType === "success") {
            navigate('/login/');
        }
    }, [responseType, navigate]);

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
                    Set Password
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
                        label="Confirm New Password"
                        name="new_password2"
                        type="password"
                        value={new_password2}
                        onChange={handlingInput}
                        error={errors.new_password2 ? true : false}
                        helperText={errors.new_password2 ? errors.new_password2 : ''}
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
                        Set Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        responseType: state.AuthReducer.type,
        payload: state.AuthReducer.payload,
    };
};

export default connect(mapStateToProps, { resetPasswordConfirm })(ResetPasswordConfirm);
