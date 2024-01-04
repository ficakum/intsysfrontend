import { ChangeEvent, HTMLAttributes, useRef, useState } from "react";
import cx from "classnames";

import "./SignUp.scss";
import { Button, Input } from "@mui/material";

interface ISignUpProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SignUp = ({ className }: ISignUpProps) => {
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [isRepeatPasswordInvalid, setIsRepeatPasswordInvalid] =
    useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

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

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(email);
    setIsEmailInvalid(isValidEmail);
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

  const onSignUp = () => {
    validateUsername(username);
    validatePassword(password);
    validateRepeatPassword(repeatPassword);
    validateEmail(email);

    return;
  };

  return (
    <div className={cx("signup", className)}>
      <Input
        className="signup-username"
        ref={usernameInputRef}
        type="text"
        placeholder="Enter username"
        error={isUsernameInvalid}
        onChange={handleUsernameChange}
      />
      <Input
        className="signup-email"
        ref={emailInputRef}
        type="text"
        placeholder="Enter email"
        error={isEmailInvalid}
        onChange={handleEmailChange}
      />
      <Input
        className="signup-password"
        ref={passwordInputRef}
        type="text"
        placeholder="Enter password"
        error={isPasswordInvalid}
        onChange={handlePasswordChange}
      />
      <Input
        className="signup-password"
        ref={repeatPasswordInputRef}
        type="text"
        placeholder="Repeat password"
        error={isRepeatPasswordInvalid}
        onChange={handleRepeatPasswordChange}
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
