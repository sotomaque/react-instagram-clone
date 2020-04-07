import React from "react";
import { useLoginPageStyles } from "../styles";

import SEO from '../components/shared/Seo';
import { Card, CardHeader, TextField, Button, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

import LoginWithFacebook from '../components/shared/LoginWithFacebook';


function LoginPage() {
  const classes = useLoginPageStyles();

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            {/* Header */}
            <CardHeader className={classes.cardHeader} />

            {/* Input Form */}
            <form>
              <TextField
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
              />
              <Button 
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
              Login
              </Button>
               
              {/* Or Line */}
              <div className={classes.orContainer}>
                <div className={classes.orLine} />
                <div>
                  <Typography variant='body2' color='textSecondary'>
                    OR
                  </Typography>
                </div>
                <div className={classes.orLine} />
              </div>

              {/* Login with Facebook */}
              <LoginWithFacebook color="secondary" iconColor="blue" />

              <Button fullWidth color="secondary">
                <Typography variant="caption">
                  Forgot Password?
                </Typography>
              </Button>
            </form>
          </Card>

          {/* Sign up Link */}
          <Card className={classes.signUpCard}>
            <Typography align="right" variant="body2">
              Don't have an account?
            </Typography>
            <Link to='/accounts/emailsignup'>
              <Button color='primary' className={classes.signUpButton}>
                Sign up
              </Button>
            </Link>
          </Card>

        </article>
      </section>
    </>
  );
}

export default LoginPage;
