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
  const classes = useLoginPageStyles();
  const history = useHistory();
  const client = useApolloClient();
  const { loginWithEmailAndPassword } = React.useContext(AuthContext);
  const { register, handleSubmit, watch, formState } = useForm({ mode: 'onBlur' });
  
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const hasPassword = Boolean(watch('password'));

  async function onSubmit({ input, password }) {
    try {
      setError('');
      if (!isEmail(input)) {
        input = await getUserEmail(input);
      } 
      await loginWithEmailAndPassword(input, password);
      setTimeout(() => history.push('/'), 0);
    } catch(err) {
      console.error("error logging up", err)
      handleError(err)
    }
  }

  function handleError(error) {
    if (error.code.includes('auth')) {
      setError(error.message);
    }
  }

  async function getUserEmail(input) {
    const variables = { input }
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables
    });
    const userEmail = response.data.users[0]?.email || "no@email.com";
    return userEmail;
  }

  function toggleShowPassword() {
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
                name='input'
                inputRef={register({
                  required: true,
                  minLength: 5
                })}
                fullWidth
                variant="filled"
                label="Username, email, or phone"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              {/* Password */}
              <TextField
                name='password'
                inputRef={register({
                  required: true,
                  minLength: 6
                })}
                InputProps={{
                  endAdornment: hasPassword &&(
                    <InputAdornment>
                      <Button onClick={toggleShowPassword}>{showPassword ? "Hide" : "Show"}</Button>
                    </InputAdornment>
                  )
                }}
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="filled"
                label="Password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
              />
              {/* Login Button */}
              <Button 
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
                disabled={formState.isSubmitting || !formState.isValid}
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
