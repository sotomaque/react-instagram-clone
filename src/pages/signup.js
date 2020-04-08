import React from "react";
import { useSignUpPageStyles } from "../styles";

import SEO from '../components/shared/Seo';
import { Card, TextField, Button, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

import LoginWithFacebook from '../components/shared/LoginWithFacebook';


function SignUpPage() {
  const classes = useSignUpPageStyles();

  return (
    <>
      <SEO title="Sign Up" />
      <section className={classes.section}>
        <article>
          {/* Sign Up Card */}
          <Card className={classes.card}>
            <div className={classes.cardHeader} />

            {/* Sign Up Header */}
            <Typography className={classes.cardHeaderSubHeader}>
            Sign up to see photos and videos from your friends
            </Typography>

            {/* Login with Facebook Button */}
            <LoginWithFacebook color='primary' iconColor='white' variant='contained' />
          
            {/* Divider */}
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant='body2' color='textSecondary'>
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>

            {/* Sign Up Form */}
            <form>
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                type="email"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
              />
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
                autoComplete="new-password"
              />
            </form>
            <Button 
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
              Sign Up
            </Button>
          </Card>

          {/* Link to Login Page */}
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2">
              Have have an account?
            </Typography>
            <Link to='/accounts/login'>
              <Button color='primary' className={classes.loginButton}>
                Log in
              </Button>
            </Link>
          </Card>
          
        </article>
      </section>
    </>
  );
}

export default SignUpPage;
