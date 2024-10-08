import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signUpUser } from "../../services/Auth";
import "./SignUp.scss";

const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
    },
    primary: {
      main: "#FFFFFF",
    },
  },
});

const SignUp = () => {
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [isRepeatPasswordInvalid, setIsRepeatPasswordInvalid] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const validateUsername = (username: string) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    const isValidUsername = regex.test(username);
    setIsUsernameInvalid(!isValidUsername);

    return !isValidUsername;
  };

  const validateEmail = (email: string) => {
    const regex = /^[^@]+@[^@]+\.[^@]+$/;
    const isValidEmail = regex.test(email);
    setIsEmailInvalid(!isValidEmail);

    return !isValidEmail;
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isValidPassword = regex.test(password);
    setIsPasswordInvalid(!isValidPassword);

    return !isValidPassword;
  };

  const validateRepeatPassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isValidPassword = regex.test(password);
    setIsRepeatPasswordInvalid(!isValidPassword);

    return !isValidPassword;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRepeatPassword = event.target.value;
    setRepeatPassword(newRepeatPassword);
  };

  const onSignUp = async () => {
    let err = validateUsername(username) 
    err =  validateEmail(email) || err
    err =  validatePassword(password) || err
    err =  validateRepeatPassword(repeatPassword) || err

    if (!username || !email || !password || !repeatPassword || err) {
      return;
    }

    if (password !== repeatPassword) {
      setIsRepeatPasswordInvalid(true)
      return;
    }

    await signUpUser(username, password, email)
      .then(() => navigate("/Welcome"))
      .catch((error) => {
        if(error.response.status === 400){
          setIsUsernameInvalid(true);
          setIsEmailInvalid(true);
        }
        else{
          console.log(error);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  sx={{ backgroundColor: "rgba(93, 26, 155, 0.93)" }}
                  autoComplete="given-name"
                  name="firstName"
                  id="firstName"
                  label="Username"
                  required
                  fullWidth
                  autoFocus
                  className="signup-username"
                  ref={usernameInputRef}
                  type="text"
                  placeholder="Enter username"
                  error={isUsernameInvalid}
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ backgroundColor: "rgba(93, 26, 155, 0.93)" }}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className="signup-email"
                  ref={emailInputRef}
                  type="text"
                  placeholder="Enter email"
                  error={isEmailInvalid}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ backgroundColor: "rgba(93, 26, 155, 0.93)" }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  className="signup-password"
                  ref={passwordInputRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  error={isPasswordInvalid}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={handleTogglePasswordVisibility}
                          edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ backgroundColor: "rgba(93, 26, 155, 0.93)" }}
                  required
                  fullWidth
                  name="password"
                  label="Repeat password"
                  id="repeat-password"
                  className="signup-password"
                  ref={repeatPasswordInputRef}
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  error={isRepeatPasswordInvalid}
                  onChange={handleRepeatPasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={handleToggleRepeatPasswordVisibility}
                          edge="end">
                          {showRepeatPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "rgba(144, 12, 63, 0.85)",
                color: "white",
                ":hover": {
                  bgcolor: "rgb(144, 12, 63)",
                },
              }}
              onClick={() => onSignUp()}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
