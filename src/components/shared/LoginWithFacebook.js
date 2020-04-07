import React from 'react';
import { useLoginPageStyles } from "../../styles";
import {  Button } from "@material-ui/core";

import FacebookIconBlue from '../../images/facebook-icon-blue.svg';
import FacebookIconWhite from '../../images/facebook-icon-white.png';

function LoginWithFacebook({ color, iconColor, variant }) {
    const classes = useLoginPageStyles();
    
    const facebookIcon = iconColor === 'blue' ? FacebookIconBlue : FacebookIconWhite;
    
    return (
        <Button fullWidth color={color} variant={variant}>
        <img 
            src={facebookIcon}
            alt="facebook icon"
            className={classes.facebookIcon}
        />
        Log In with Facebook
        </Button>
    );
}


export default LoginWithFacebook;
