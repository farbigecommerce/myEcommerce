import React from "react";
import Navbar from "../Component/navbar";
import CustomAlert from "../Component/customalert";
import { connect } from "react-redux";
import { useEffect } from "react";
import { verify, getUser, googleLogin } from "../reducer/Actions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import BottomTab from "../Component/Slider";

const Layout = (props) => {
    
    let location = useLocation();

    useEffect (() => {
        const values = queryString.parse(location.search);
        const code = values.code;
        if ( code ) {
            props.googleLogin( code );
        } else {
            props.verify();
            props.getUser();
        }
    }, [location]);

    return (
        <div>
            < Navbar />
            {props.message ? (
                <CustomAlert message={props.message} type={props.type} />
            ) : null}
            {props.children}
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        
        message: state.AuthReducer.message,
        access: state.AuthReducer.access,
        refresh: state.AuthReducer.refresh,
        isAuthenticated: state.AuthReducer.isAuthenticated,
        user: state.AuthReducer.user,
        type: state.AuthReducer.type

    }
}

export default connect(mapStateToProps, { verify, getUser, googleLogin })(Layout);