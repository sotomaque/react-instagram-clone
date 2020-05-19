import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useApolloClient } from "@apollo/react-hooks";
import { CHECK_IF_USERNAME_IS_TAKEN } from "../graphql/queries";
import { AuthContext } from "../auth";

import { Card, TextField, Button, Typography, InputAdornment } from "@material-ui/core";
import { HighlightOff, CheckCircleOutline } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import SEO from '../components/shared/Seo';
import LoginWithFacebook from '../components/shared/LoginWithFacebook';


import { useSignUpPageStyles } from "../styles";

function SignUpPage() {
  const classes = useSignUpPageStyles();
  const history = useHistory();
  const client = useApolloClient();
  const { signUpWithEmailAndPassword } = React.useContext(AuthContext);
  const { register, handleSubmit, formState, errors } = useForm({ mode: 'onBlur' });

  const [error, setError] = React.useState('')

  async function onSubmit(data) {
    try {
      setError('');
      await signUpWithEmailAndPassword(data);
      history.push('/');
    } catch(err) {
      console.error("error signing up", err)
      handleError(err)
    }
  }

  function handleError(error) {
    if (error.message.includes('users_username_key')) {
      setError('Username Already Taken');
    } else if (error.code.includes('auth')) {
      setError(error.message);
    }
  }

  async function validateUsername(username) {
    const variables = { username }
    const response = await client.query({
      query: CHECK_IF_USERNAME_IS_TAKEN,
      variables
    });
    const isUsernameValid = response.data.users.length === 0;
    return isUsernameValid
  }

  const errorIcon = (
    <InputAdornment>
      <HighlightOff style={{ color: 'red', height: 30, width: 30 }} />
    </InputAdornment>
  )

  const validIcon = (
    <InputAdornment>
      <CheckCircleOutline style={{ color: '#ccc', height: 30, width: 30 }} />
    </InputAdornment>
  )

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="email"
                inputRef={register({
                  required: true,
                  validate: input => isEmail(input) // true or false 
                })}
                InputProps={{
                  endAdornment: errors.email 
                    ? errorIcon 
                    : formState.touched.email && validIcon
                }}
                fullWidth
                variant="filled"
                label="Email"
                type="email"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                name="name"
                inputRef={register({
                  required: true,
                  minLength: 5,
                  maxLength: 20
                })}
                InputProps={{
                  endAdornment: errors.name 
                    ? errorIcon 
                    : formState.touched.name && validIcon
                }}
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                name="username"
                inputRef={register({
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  // accept only lowercase and uppercase letters, numbers, underscores and periods
                  pattern: /^[a-zA-Z0-9_.]*$/,
                  validate: async (input) => await validateUsername(input)
                })}
                InputProps={{
                  endAdornment: errors.username 
                    ? errorIcon 
                    : formState.touched.username && validIcon
                }}
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                name="password"
                inputRef={register({
                  required: true,
                  minLength: 6                 
                })}
                InputProps={{
                  endAdornment: errors.password 
                    ? errorIcon 
                    : formState.touched.password && validIcon
                }}
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                margin="dense"
                className={classes.textField}
                autoComplete="new-password"
              />
              <Button 
                disabled={formState.isSubmitting || !formState.isValid}
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
            <AuthError error={error} />
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

export function AuthError({ error }) {
  return Boolean(error) && (
    <Typography 
      align='center'
      gutterBottom
      variant='body2'
      style={{color: 'red'}}
    >
      {error}
    </Typography>
  )
}

export default SignUpPage;
