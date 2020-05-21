import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useApolloClient } from "@apollo/react-hooks";
import { GET_USER_EMAIL } from "../graphql/queries";
import { AuthContext } from "../auth";

import { Card, CardHeader, TextField, Button, Typography, InputAdornment } from "@material-ui/core";
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import SEO from '../components/shared/Seo';
import LoginWithFacebook from '../components/shared/LoginWithFacebook';
import { AuthError } from './signup';

import { useLoginPageStyles } from "../styles";

function LoginPage() {
  // hooks
  const classes = useLoginPageStyles();
  const history = useHistory();
  const client = useApolloClient();
  const { register, handleSubmit, watch, formState } = useForm({ mode: 'onBlur' });

  // context
  const { loginWithEmailAndPassword } = React.useContext(AuthContext);
  
  // state and variables
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const hasPassword = Boolean(watch('password'));

  /**
   * Async function for submitting form
   *  function is passed in to handleSubmit function from useForm hook
   *  function checks if input is email. if not function calls getUserEmail
   *   and uses the returned value to override passed in input
   *  function then calls loginWithEmailAndPassword and pushes user to feed page
   *
   * @param {Object} inputObject - inputObject comes from HOC and contains input
   *                               and password attributes from form
   */
  async function onSubmit({ input, password }) {
    try {
      setError('');
      if (!isEmail(input)) {
        input = await getUserEmail(input);
      } 
      await loginWithEmailAndPassword(input, password);
      setTimeout(() => history.push('/'), 0);
    } catch(err) {
      console.error("Error Logging In", err)
      handleError(err)
    }
  }

  /**
   * Function for setting error message from submitting form
   *  Cleans up Firebase errors for presentation to the user
   *  Within AuthError Component
   * 
   * @param {Object} error - error object from loginWithEmailAndPassword
   */
  function handleError(error) {
    if (error.code.includes('auth')) {
      setError(error.message);
    }
  }

  /**
   * Async function for getting user email from their input
   *  function calls GET_USER_EMAIL query with input as param variables
   * 
   * @param {String} input - input can be either phone number or a username 
   */
  async function getUserEmail(input) {
    const variables = { input }
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables
    });
    const userEmail = response.data.users[0]?.email || "no@email.com";
    return userEmail;
  }

  function togglePasswordVisibility() {
    setShowPassword(prev => !prev);
  }

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            {/* Header */}
            <CardHeader className={classes.cardHeader} />
            {/* Input Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Input */}
              <TextField
                name="input"
                inputRef={register({
                  required: true,
                  minLength: 5,
                })}
                fullWidth
                variant="filled"
                label="Username, email, or phone"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                name="password"
                inputRef={register({
                  required: true,
                  minLength: 5,
                })}
                InputProps={{
                  endAdornment: hasPassword && (
                    <InputAdornment>
                      <Button onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputAdornment>
                  ),
                }}
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="filled"
                label="Password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
              />
              <Button
                disabled={!formState.isValid || formState.isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Log In
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
              {/* Error */}
              <AuthError error={error} />
              {/* Forgot Password */}
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
