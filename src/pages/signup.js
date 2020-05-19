import React from "react";
import { useSignUpPageStyles } from "../styles";

import SEO from '../components/shared/Seo';
import { Card, TextField, Button, Typography } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';

import LoginWithFacebook from '../components/shared/LoginWithFacebook';
import { AuthContext } from "../auth";


function SignUpPage() {
  const classes = useSignUpPageStyles();
  const history = useHistory();

  const { signUpWithEmailAndPassword } = React.useContext(AuthContext);

  const [values, setValues] = React.useState({
    email: '',
    name: '',
    username: '', 
    password: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('here')
    console.log('values: ', values)
    await signUpWithEmailAndPassword(values);
    history.push('/');
  }

  return (
    <>
      <SEO title="Sign Up" />
      <section className={classes.section}>
        <article>
          {/* Sign Up Card */}
          <Card className={classes.card}>
            {/* Logo */}
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
            <form onSubmit={(event) => handleSubmit(event)}>
              <TextField
                name="email"
                onChange={(event) => handleChange(event)}
                fullWidth
                variant="filled"
                label="Email"
                type="email"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                name="name"
                onChange={(event) => handleChange(event)}
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                name="username"
                onChange={(event) => handleChange(event)}
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                name="password"
                onChange={(event) => handleChange(event)}
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                margin="dense"
                className={classes.textField}
                autoComplete="new-password"
              />
              <Button 
                  variant="contained"
                  fullWidth
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                Sign Up
              </Button>
            </form>
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
