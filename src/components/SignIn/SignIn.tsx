import { ChangeEvent, HTMLAttributes, useRef, useState } from "react";
import cx from "classnames";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signInUser } from "../../services/Auth";
import "./SignIn.scss";

interface ISignInProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

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

const SignIn = ({ className }: ISignInProps) => {
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);


  const validateUsername = (username: string) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    const isValidUsername = regex.test(username);
    setIsUsernameInvalid(!isValidUsername);
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isValidPassword = regex.test(password);
    setIsPasswordInvalid(!isValidPassword);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const onSignIn = async () => {
    validateUsername(username);
    validatePassword(password);
    
    if (!username || !password || isUsernameInvalid || isPasswordInvalid) {
      return;
    }

    await signInUser(username, password)
      .then(() => navigate("/Welcome"))
      .catch((error) => {
        if (error.response.status === 404){
          setIsUsernameInvalid(true);
        }
        else if(error.response.status === 400){
          setIsPasswordInvalid(true);
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
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <div className={cx("signin", className)}>
              <TextField
                sx={{ backgroundColor: "rgba(93, 26, 155, 0.93)" }}
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                id="username"
                autoFocus
                className="signin-username"
                ref={usernameInputRef}
                type="text"
                error={isUsernameInvalid}
                onChange={handleUsernameChange}
              />
              <TextField
                sx={{ backgroundColor: "rgba(93, 26, 155, 0.93)" }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                className="signin-password"
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
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  mb: 2,
                  backgroundColor: "rgba(144, 12, 63, 0.85)",
                  color: "white",
                  ":hover": {
                    bgcolor: "rgb(144, 12, 63)",
                  },
                }}
                onClick={() => onSignIn()}>
                Sign In
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
