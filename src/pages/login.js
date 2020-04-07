import React from "react";
import { useLoginPageStyles } from "../styles";

import SEO from '../components/shared/Seo';
import { Card, CardHeader, TextField, Button } from "@material-ui/core";

function LoginPage() {
  const classes = useLoginPageStyles();

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader classes={classes.cardHeader} />
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
            </form>
          </Card>
        </article>
      </section>
    </>
  )
}

export default LoginPage;
