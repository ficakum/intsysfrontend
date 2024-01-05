import { ChangeEvent, HTMLAttributes, useRef, useState } from "react";
import cx from "classnames";
import { useNavigate } from "react-router-dom";

import "./SignIn.scss";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { signInUser } from "../../services/Auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ISignInProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

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
    <div className={cx("signin", className)}>
      <TextField
        className="signin-username"
        ref={usernameInputRef}
        type="text"
        placeholder="Enter username"
        error={isUsernameInvalid}
        onChange={handleUsernameChange}
      />
      <TextField
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onClick={() => onSignIn()}
        style={{
          padding: "15px 32px 15px 32px",
          border: isHovered ? "" : "2px solid #4B4B4B",
          color: "#4B4B4B",
          boxShadow: isHovered
            ? "0px 4px 15px 0px #5D5FEF66, 0px -4px 15px 0px #EB000033"
            : "",
        }}>
        Sign in
      </Button>
    </div>
  );
};

export default SignIn;
