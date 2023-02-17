import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Paper, Typography } from "@material-ui/core";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, Providers } from "../../config/firebase";
import GoogleLogo from "../../icons/google.svg";
import { LOCAL_STORAGE } from "../../models/localstorage.model";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const styles = {
  parentContainer: {
    marginLeft: "25%",
    marginTop: "5%",
    height: "50%",
  },
  providerButton: {
    border: "none",
    borderWidth: "2px",
    borderRadius: 28,
    marginLeft: "1%",
    marginBottom: "4%",
    width: "100%",
  },
  googleLogo: {
    width: "15px",
    height: "15px",
  },
};

const Login = () => {
  const navigate = useNavigate();

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogIn = async (e: any) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userToken = await userCredential.user.getIdToken();
      localStorage.setItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN, userToken);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (e: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userToken = await userCredential.user.getIdToken();
      localStorage.setItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN, userToken);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: any) => {
    if (hasAccount) {
      await handleLogIn(e);
    } else {
      await handleSignUp(e);
    }
  };

  const changeView = () => {
    setHasAccount(!hasAccount);
  };

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, Providers.google);
      const credential: any =
        GoogleAuthProvider.credentialFromResult(userCredential);
      if (credential !== null && typeof credential !== "undefined") {
        const idTokenResponse = await credential._getIdTokenResponse(auth);
        const token = idTokenResponse.idToken;
        localStorage.setItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN, token);
        console.log(userCredential);
        console.log(credential);
        console.log(idTokenResponse);
        console.log(token);

        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      container
      component="main"
      className={classes.root}
      style={styles.parentContainer}
    >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <>
            <Typography component="h1" variant="h5">
              {hasAccount ? "Log in" : "Sign up"}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              {hasAccount ? "Log in" : "Sign up"}
            </Button>
            <Button
              style={styles.providerButton}
              size="large"
              variant="outlined"
              startIcon={
                <img
                  style={styles.googleLogo}
                  src={GoogleLogo}
                  alt="Google Logo"
                />
              }
              onClick={signInWithGoogle}
            >
              Continue With Google
            </Button>
            <Typography
              onClick={changeView}
              component="h1"
              variant="h6"
              style={{ cursor: "pointer" }}
            >
              {hasAccount
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </Typography>
          </>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
