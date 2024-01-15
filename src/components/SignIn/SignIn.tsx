import { ChangeEvent, HTMLAttributes, useRef, useState } from "react";
import cx from "classnames";
import { useNavigate } from "react-router-dom";

import "./SignIn.scss";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { signInUser } from "../../services/Auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";


import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

interface ISignInProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const defaultTheme = createTheme();

const SignIn = ({ className }: ISignInProps) => {
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
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

    if (isUsernameInvalid || isPasswordInvalid) {
      return;
    }

    await signInUser(username, password);

    navigate("/Welcome");
  };

  return (
  //   <div className={cx("signin", className)}>
  //     <TextField
  //       className="signin-username"
  //       ref={usernameInputRef}
  //       type="text"
  //       placeholder="Enter username"
  //       error={isUsernameInvalid}
  //       onChange={handleUsernameChange}
  //     />
  //     <TextField
  //       className="signin-password"
  //       ref={passwordInputRef}
  //       type={showPassword ? "text" : "password"}
  //       placeholder="Enter password"
  //       error={isPasswordInvalid}
  //       onChange={handlePasswordChange}
  //       InputProps={{
  //         endAdornment: (
  //           <InputAdornment position="end">
  //             <IconButton onClick={handleTogglePasswordVisibility} edge="end">
  //               {showPassword ? <Visibility /> : <VisibilityOff />}
  //             </IconButton>
  //           </InputAdornment>
  //         ),
  //       }}
  //     />
  //     <Button
  //       onMouseEnter={() => setIsHovered(true)}
  //       onMouseLeave={() => setIsHovered(false)}
  //       onTouchStart={() => setIsHovered(true)}
  //       onTouchEnd={() => setIsHovered(false)}
  //       onClick={() => onSignIn()}
  //       style={{
  //         padding: "15px 32px 15px 32px",
  //         border: isHovered ? "" : "2px solid #4B4B4B",
  //         color: "#4B4B4B",
  //         boxShadow: isHovered
  //           ? "0px 4px 15px 0px #5D5FEF66, 0px -4px 15px 0px #EB000033"
  //           : "",
  //       }}>
  //       Sign in
  //     </Button>
  //   </div>
  // );


  <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" /* onSubmit={handleSubmit} */ noValidate sx={{ mt: 1 }}>
            <div className={cx("signin", className)}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="email"
                autoFocus
                
                className="signin-username"
                ref={usernameInputRef}
                type="text"
                error={isUsernameInvalid}
                onChange={handleUsernameChange}
              />
              <TextField
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
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
                onClick={() => onSignIn()}
              >
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
