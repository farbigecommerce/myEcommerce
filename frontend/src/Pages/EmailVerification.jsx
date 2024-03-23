import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { emailVerification, redirect_view } from "../reducer/Actions";
import { Button, Typography, Container, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const EmailVerification = ({ emailVerification, responseType, redirect_view }) => {
    
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const { key } = useParams();

    const handlingSubmit = (e) => {
        e.preventDefault();
        emailVerification(key);
    };

    useEffect(() => {
        if (responseType === "success") {
            setStatus(true);
        }
    }, [responseType]);

    useEffect(() => {
        if (status) {
            redirect_view()
            setStatus(false)
            navigate('/login/');
        }
    }, [status, navigate]);

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
                <Typography component="h2" variant="h5" sx={{ marginBottom: 2 }}>
                    Activate Account
                </Typography>
                <Typography component="h5" variant="subtitle1" sx={{ marginBottom: 4 }}>
                    Click the below link to activate your account
                </Typography>
                <Box component="form" onSubmit={handlingSubmit} noValidate sx={{ mt: 1 }}>
                    <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
                        Activate Account
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

export default connect(mapStateToProps, { emailVerification, redirect_view })(EmailVerification);
