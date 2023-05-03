import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, Providers } from "../../config/firebase";
import GoogleLogo from "../../icons/google.svg";
import { LOCAL_STORAGE } from "../../models/localstorage.model";
import { useNavigate } from "react-router-dom";
import UserServices from "../../services/user.service";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const handleNameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleCheckboxChange = (e: any) => {
    setRememberMe(e.target.checked);
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const setStorages = (
    userId: string,
    authToken: string,
    isAdmin: string,
    isAdminMode: string
  ) => {
    localStorage.setItem(LOCAL_STORAGE.USER_ID, userId);
    localStorage.setItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN, authToken);
    sessionStorage.setItem(LOCAL_STORAGE.IS_ADMIN, isAdmin);
    sessionStorage.setItem(LOCAL_STORAGE.IS_ADMIN_MODE, isAdminMode);
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
      const userModel = (await UserServices.getUser(email)).message;
      setStorages(userModel._id, userToken, `${userModel.isAdmin}`, "false");
      navigate("/store/games");
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
      setStorages("", userToken, "false", "false");
      await createUser(username, email, rememberMe);
      navigate("/store/games");
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

        const googleEmail: string = userCredential.user.email!;
        const googleName: string = userCredential.user.displayName!;

        const userResp = await UserServices.getUser(googleEmail);
        const mongoUser = userResp.message;
        const userExists = userResp.success;

        if (userExists) {
          setStorages(mongoUser._id, token, `${mongoUser.isAdmin}`, "false");
        } else {
          setStorages("", token, "false", "false");
          await createUser(googleName, googleEmail, false);
        }

        navigate("/store/games");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (
    name: string,
    mail: string,
    rememberme: boolean
  ) => {
    const user = await UserServices.createUser(name, mail, rememberme);
    localStorage.setItem(LOCAL_STORAGE.USER_ID, user.message._id);
  };

  const [forgotPassword, setForgotPassword] = useState(false);

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
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

            {!hasAccount && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                autoFocus
                value={username}
                onChange={handleNameChange}
              />
            )}
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
            {/* Forgot Password Dialog */}
          <Dialog open={forgotPassword} onClose={() => setForgotPassword(false)}>
            <DialogTitle>Forgot Password?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your email address to reset your password.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setForgotPassword(false)}>Cancel</Button>
              <Button onClick={handleForgotPassword} variant="contained" color="primary">
                Send Reset Link
              </Button>
            </DialogActions>
          </Dialog>

      {/* Forgot Password Link */}
      <div onClick={() => setForgotPassword(true)}>Forgot Password?</div>
            {!hasAccount && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={handleCheckboxChange}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
              </>
            )}
            <Typography
              onClick={changeView}
              component="h1"
              variant="h6"
              style={styles.switchTab}
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

const useStyles = makeStyles((theme: Theme) => ({
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
  switchTab: {
    cursor: "pointer",
  },
};

export default Login;
