import { ChangeEvent, HTMLAttributes, useRef, useState } from "react";
import cx from "classnames";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./SignUp.scss";

import { signUpUser } from "../../services/Auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ISignUpProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SignUp = ({ className }: ISignUpProps) => {
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [isRepeatPasswordInvalid, setIsRepeatPasswordInvalid] =
    useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
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
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isValidPassword = regex.test(password);
    setIsPasswordInvalid(!isValidPassword);
  };

  const validateRepeatPassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isValidPassword = regex.test(password);
    setIsRepeatPasswordInvalid(!isValidPassword);
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
    validateUsername(username);
    validatePassword(password);
    validateRepeatPassword(repeatPassword);

    // if (
    //   isUsernameInvalid ||
    //   isEmailInvalid ||
    //   isPasswordInvalid ||
    //   isRepeatPasswordInvalid
    // ) {
    //   return;
    // }

    // if (password !== repeatPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }

    await signUpUser(username, password, email);

    navigate("/Welcome");
  };

  return (
    <div className={cx("signup", className)}>
      <TextField
        className="signup-username"
        ref={usernameInputRef}
        type="text"
        placeholder="Enter username"
        error={isUsernameInvalid}
        onChange={handleUsernameChange}
      />
      <TextField
        className="signup-email"
        ref={emailInputRef}
        type="text"
        placeholder="Enter email"
        onChange={handleEmailChange}
      />
      <TextField
        className="signup-password"
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
      <TextField
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
                onClick={handleToggleRepeatPasswordVisibility}
                edge="end">
                {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        size="small"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onClick={() => onSignUp()}
        style={{
          padding: "15px 32px 15px 32px",
          border: isHovered ? "" : "2px solid #4B4B4B",
          color: "#4B4B4B",
          boxShadow: isHovered
            ? "0px 4px 15px 0px #5D5FEF66, 0px -4px 15px 0px #EB000033"
            : "",
        }}>
        Sign up
      </Button>
    </div>
  );
};

export default SignUp;
