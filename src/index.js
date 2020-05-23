import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline, Typography } from "@material-ui/core";
import theme from "./theme";
import App from "./App";
import AuthProvider from './auth';
import client from './graphql/client';

class ErrorBoundry extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography component='h1' variant='h6' align='center'>
          Oops! Something went wrong.
        </Typography>
      )
    }
    return this.props.children;
  }

}

ReactDOM.render(
  <ErrorBoundry>
    <ApolloProvider client={client}>
      <AuthProvider>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </MuiThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </ErrorBoundry>,
  document.getElementById("root")
);
