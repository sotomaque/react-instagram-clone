import React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth';

import {  Button } from "@material-ui/core";
import { AuthError } from '../../pages/signup';

import FacebookIconBlue from '../../images/facebook-icon-blue.svg';
import FacebookIconWhite from '../../images/facebook-icon-white.png';

import { useLoginPageStyles } from "../../styles";

function LoginWithFacebook({ color, iconColor, variant }) {
    const classes = useLoginPageStyles();
    const history = useHistory();
    const { loginWithGoogle } = React.useContext(AuthContext);
    const facebookIcon = iconColor === 'blue' ? FacebookIconBlue : FacebookIconWhite;

    const [error, setError] = React.useState('')

    async function handleLoginWithGoogle() {
        try {
            await loginWithGoogle();
            setTimeout(() => history.push('/'), 0);
        } catch(err) {
            setError(err.message);
            console.error('error logging in with google', err)
        }
    }
    
    return (
        <>
            <Button onClick={handleLoginWithGoogle} fullWidth color={color} variant={variant}>
            <img 
                src={facebookIcon}
                alt="facebook icon"
                className={classes.facebookIcon}
            />
            Log In with Facebook
            </Button>
            <AuthError error={error} />
        </>
    );
}


export default LoginWithFacebook;
